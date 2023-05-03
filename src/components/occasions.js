import React, { useEffect, useState } from "react";
const APIURL = "http://localhost:8080";
import { Link } from 'react-router-dom';
import '../css/occasions.css';

const AllOccasions = () => {
 const [occasions, setOccasions] = useState([]);

 useEffect(() => {
  
  const getAllOccasions = async() => {
    try {
      const response = await fetch(`${APIURL}/api/occasions`);
      console.log("RESPONSE", response);
      const result = await response.json();
      console.log(result);
      setOccasions(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
  getAllOccasions();
 }, [])


 
 return(
  
  <div className="occasionsbox">
    <h1 id="headline">Shop By Occasion</h1>
  {
    occasions.map((occasions, index) => {
      return (
      <div className="occasion" key={index}>
       <Link className="eachoccasion" to={"baskets"}><h3>{occasions.name}</h3></Link> 
       
      </div>
      )
    })
  }
  </div>

 )
  
}

export default AllOccasions;