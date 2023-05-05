import React, { useEffect, useState } from "react";
const APIURL = "http://localhost:8080";
import { Link } from 'react-router-dom';
import '../css/occasions.css';

const AllOccasions = ({setFilteredBaskets}) => {
 const [occasions, setOccasions] = useState([]);

 useEffect(() => {
  
  const getAllOccasions = async() => {
    try {
      const response = await fetch(`${APIURL}/api/occasions`);
      const result = await response.json();
      setOccasions(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
  getAllOccasions();
 }, [])

const getBasketsByOccasionId = async(occasionId) => {
  try{
    const response = await fetch(`${APIURL}/api/baskets/${occasionId}`);
    const result = await response.json();
    setFilteredBaskets(result);
    window.localStorage.setItem("filteredBaskets",JSON.stringify(result));
    return result
  } catch (err){
    console.error(err)
  }
};

const onClickHandler = (occasionId) => {
  let result = getBasketsByOccasionId(occasionId);
  console.log(result)
};
 
 return(
  
  <div id="occasionsbox">
    <h1 id="headline">Shop By Occasion</h1>
  {
    occasions.map((occasions, index) => {

      return (
      <div className="occasion" key={index}>
        
       <Link onClick = {() => {
        onClickHandler(occasions.id)
       }} className="eachoccasion" to={"baskets"}><h2 className="occasionname">{occasions.name}<img src={occasions.image} alt={occasions.name}/></h2></Link> 
      </div>
      )
    })
  }
  </div>

 )
  
}

export default AllOccasions;
