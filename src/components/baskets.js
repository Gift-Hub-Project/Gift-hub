import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const APIURL = "http://localhost:8080";
import '../css/baskets.css';


const Baskets = ({ user, usersCart, setUsersCart, token, setToken, filteredBaskets }) => {
    const [baskets, setBaskets] = useState([]);
    

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
      const userId = user.id;
      try{
        const response = await fetch(`${APIURL}/api/userscart/addItem/${usersCart.id}/${basketId}`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
        });
        const data = await response.json()
      } catch (error) {
        console.error('Error adding basket to cart:', error)
      }
    };
    const updateCartQuantity = async(basketId) => {
      const userId = user.id;
      try{
        const response = await fetch(`${APIURL}/api/userscart/updateAddItem/${usersCart.id}/${basketId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type' : 'application/json',
          },
        });
        const data = await response.json()
      } catch (error) {
        console.error('Error adding basket to cart:', error)
      }
    };
    const createCart = async (token) => {
      try { //need to be updated with post createcart function
        let response = await fetch(`${APIURL}/api/userscart`,{
          method:"POST",
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          //not putting body but may need one, depends on backend
        })
        const data = await response.json()
        setUsersCart(data);
      } catch(error) {
        console.error(error);

      }
    }


    const onAddClick = async(basketId, basket) => {
      let copyUsersCart ={...usersCart};

      if (!Array.isArray(copyUsersCart.updatedCart)) {
        copyUsersCart.updatedCart =[];
      }
      const existingItem = copyUsersCart.updatedCart.find(
        (item) => item.id === basketId);
      
      if(existingItem) {
        existingItem.quantity += 1;
        await updateCartQuantity(basketId, existingItem.quantity);
      } else {
        copyUsersCart.updatedCart.push(basket);
      setUsersCart(copyUsersCart);
      alert('Item added to cart!');
      await addToCart(basketId,basket.quantity)
    }

      //logic to grab/create cart
      // if(!usersCart.id){
        //this code will run if cart does not exist
        // createCart(token); not working yet
      // }
      //   addToCart(basketId, 1);
      //invoke add to cart function 
      //logic to add basket to cart
    };

    const editBasket =(basketId) => {
      window.location.href =`/baskets/edit/${basketId}`
    };

    const deleteBasket = async (basketId) => {
      try{
        const response = await fetch(`/${APIURL}/api/usersCart/removeItem/${usersCart.id}/${basketId}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
      } catch (error) {
        console.error('ERROR deleting basket:', error)
      }
    }  
    return (
        <div className='basketsbox'>
          {/* <img className='backdrop' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBprqUKchsBP1E76IROvFWP1MmQdw9UBW3ZA&usqp=CAU'/> */}
            <h1 className='basketsheadline'>Baskets</h1>
            {filteredBaskets.map((basket) => (
                <div className="baskets" key={basket.id}>
                    <h2>{basket.name}</h2>
                    <p>{basket.description}</p>
                    <Link to='/shoppingcart'><button onClick={()=> onAddClick(basket.id,basket) }>Add to Cart</button></Link>
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