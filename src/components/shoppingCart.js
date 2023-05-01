import React from 'react';
import { Link } from 'react-router-dom';

const APIURL = "http://localhost:8080";


const ShoppingCart = ({usersCart, setUsersCart}) => {
  const cartItems = Array.isArray(usersCart?.cartItems) ? usersCart.cartItems : [];
  console.log(cartItems, "cart");
//  const cartItems = usersCart?.cartItems || [];
//  console.log(cartItems,"cart")
 const total = cartItems?.reduce(
  (acc,item) => {
    console.log(item.quantity, item.price,acc, "help")
    return acc + item.quantity * item.price
  }, 0);


 const addToCart = async (basketId, numberOfItems) => {
   try {
    const response = await fetch(`${APIURL}/api/userscart/${usersCart.id}/${basketId}`, {
      method: 'PATCH',
       headers: {
       'Content-Type': 'application/json'
       },
      body: JSON.stringify({ numberOfItems })
     });
     const data = await response.json();
     setUsersCart(data);
   } catch (error) {
     console.error('Error adding item to cart:', error);
  }
 };
  const removeCartItem = async (cartId, basketId) => {
   try {
    const response = await fetch(`${APIURL}/api/userscart/deleteItem`, {
      method: 'DELETE',
       headers: {
       'Content-Type': 'application/json'
    }
     });
     const data = await response.json();
     setUsersCart(data);
   } catch (error) {
     console.error('Error removing item from cart:', error);
   }
 };


  return (
   <div>
     <h1>Shopping Cart</h1>
     {cartItems && cartItems.length > 0? (
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price:{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeCartItem(usersCart.id, item.id)}>Remove</button>
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