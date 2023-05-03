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
  
  <div className="occasionsbox">
    <img id="displaypic" src="https://media.istockphoto.com/id/1390608349/photo/wicker-basket-with-gifts-wine-and-food-against-blurred-festive-lights-space-for-text.jpg?s=612x612&w=0&k=20&c=bM03O-7QqVRs3acq-bP5FLByYo5SevRnFuqrr-DTNJI="></img>
    <h1 id="headline">Shop By Occasion</h1>
  {
    occasions.map((occasions, index) => {
      return (
      <div className="occasion" key={index}>
       <Link onClick = {() => {
        onClickHandler(occasions.id)
       }} className="eachoccasion" to={"baskets"}><h3>{occasions.name}</h3></Link>       
      </div>
      )
    })
  }
  </div>

 )
  
}

export default AllOccasions;