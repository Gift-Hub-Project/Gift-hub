import React from 'react';
import '../css/shoppingCart.css';
import { Link } from 'react-router-dom';


const APIURL = "http://localhost:8080";


const ShoppingCart = ({usersCart, setUsersCart}) => {
  let cartItems = Array.isArray(usersCart?.updatedCart) ? usersCart.updatedCart : [];
 const total = cartItems?.reduce(
  (acc,item) => {
    return acc + item.quantity * item.price
  }, 0);
 
  const removeCartItem = async (cartId, basketId) => {

    try {
     const response = await fetch(`${APIURL}/api/usersCart/removeItem/${cartId}/${basketId}`, {
       method: 'DELETE',
        // headers: {
        // 'Content-Type': 'application/json',
    //  },
    //  body:JSON.stringify({ cartId, basketId } ),
      });
      const data = await response.json();      
      return data.message;
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  const onRemoveClickItem = async ( basketId) => {//event.preventDefault()
   const message = await removeCartItem( usersCart.id,basketId);  
   
   if(message === "Item(s) of basketid deleted from cart!") {
    //manipulate front end
    let copyUsersCart = {...usersCart};
   
    copyUsersCart.updatedCart=copyUsersCart.updatedCart.filter((basket)=>{
      return basket.id !== basketId
    })
    setUsersCart(copyUsersCart);
   } else {
    console.error(error)
   }
    };

  return (
   <div className='shoppingbox'>
     <h1>Shopping Cart</h1>
     {cartItems && cartItems.length > 0 ? (
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price:{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => onRemoveClickItem(item.id)}>Remove</button>
          </div>
        ))}
        <p>Total: {total} </p>
        <Link to='/checkout'><button >Checkout</button> </Link>
     </div>
    ) :(
        <p>Your cart is empty.</p>
                
   )}
    </div>
  );


};


export default ShoppingCart;