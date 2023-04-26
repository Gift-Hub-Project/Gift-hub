import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const AllOccasions = () => {
  const [occasions, setOccasion] = useState([]);
  console.log("TEST", 'test');
  useEffect(() => {
    const getOccasionByName = async() => {
      console.log("TEST2", 'test');
      try {
        const response = await fetch('/api/occasions');
        const result = await response.json();
        setOccasion(result.data);
        console.log("Response", result.data);
      } catch(error) {
        console.error(error);
      }
    }
    getOccasionByName();
  }, [])
  
  return(
    <h1>
    </h1>
  )
}

export default AllOccasions