import React from 'react';
import '../css/shoppingCart.css';

const APIURL = "http://localhost:8080";


const ShoppingCart = ({usersCart, setUsersCart}) => {
  const cartItems = Array.isArray(usersCart?.cartItems) ? usersCart.cartItems : [];
  console.log(cartItems, "cart");
//  const cartItems = usersCart?.cartItems || [];
//  console.log(cartItems,"cart")
 const total = cartItems?.reduce(
  (acc,item) => acc + item.numberOfItems * item.basket.price,
  0
  );


 const addToCart = async (basketId, numberOfItems) => {
   try {
    const response = await fetch(`${APIURL}/api/usercart/${usersCart.id}/${basketId}`, {
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
    const response = await fetch(`${APIURL}/api/usercart/${cartId}/${basketId}`, {
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
   <div className='shoppingbox'>
     <h1>Shopping Cart</h1>
     {cartItems && cartItems.length > 0? (
      <div>
        {cartItems.map((item) => (
          <div key={item.basket.id}>
            <h2>{item.basket.name}</h2>
            <p>Price:{item.basket.price}</p>
            <p>Quantity: {item.numberOfItems}</p>
            <button onClick={() => removeCartItem(usersCart.id, item.basket.id)}>Remove</button>
          </div>
        ))}
        <p>Total: {total} </p>
        <button onClick={() => checkout(usersCart.id)}>Checkout</button>
     </div>
    ) :(
        <p>Your cart is empty.</p>
                
   )}
    </div>
  );


};


export default ShoppingCart;