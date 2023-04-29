import React, { useState, useEffect } from 'react';
const APIURL = "http://localhost:8080";


const Baskets = ({ user }) => {
    const [baskets, setBaskets] = useState([]);
    const [usersCart, setUsersCart] = useState([]);

    useEffect(() => {
        fetchBaskets();
    }, []);

    const fetchBaskets = async () => {
        try {
            const response = await fetch(`${APIURL}/api/baskets`);
            const data = await response.json();
            setBaskets(data);
        } catch (error) {
            console.error('Error fetching baskets:', error);
        }
    };

    const addToCart = async(basketId) => {
      const userId = window.localStorage.getItem("userId");
      try{
        const response = await fetch(`${APIURL}/api/usercart`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({ userId, basketId}),
        });
        const data = await response.json()
          setUsersCart(data)
      } catch (error) {
        console.error('Error adding basket to cart:', error)
      }
    };

    const editBasket =(basketId) => {
      window.location.href =`/baskets/edit/${basketId}`
    };

    const deleteBasket = async (basketId) => {
      try{
        const response = await fetch(`/${APIURL}/api/baskets/${basketId}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setBaskets(data)
      } catch (error) {
        console.error('ERROR deleting basket:', error)
      }
    }
console.log("user",user)
    return (
        <div>
            <h1>Baskets</h1>
            {baskets.map((basket) => (
                <div key={basket.id}>
                    <h2>{basket.name}</h2>
                    <p>{basket.description}</p>
                    <button onClick={()=> addToCart(basket.id)}>Add to Cart</button>
                    {user.isAdmin && (
                      <div>
                      <button onClick={()=>editBasket(basket.id)}>Edit</button>
                      <button onClick={()=>deleteBasket(basket.id)}>Delete</button>
                      </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Baskets;