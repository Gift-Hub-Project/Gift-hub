import React from 'react';
import '../css/shoppingCart.css';
import { Link } from 'react-router-dom';


const APIURL = "http://localhost:8080";


const ShoppingCart = ({usersCart, setUsersCart}) => {
  let cartItems = Array.isArray(usersCart?.updatedCart) ? usersCart.updatedCart : [];
//  let cartItems = usersCart?.updatedCart || usersCart?.cartItems ||[];
 console.log(cartItems, "cartItems", typeof cartItems)
 const total = cartItems?.reduce(
  (acc,item) => {
    return acc + item.quantity * item.price
  }, 0);
 
  const removeCartItem = async (cartId, basketId) => {
    console.log("Request body:", { cartId, basketId });

    try {
     const response = await fetch(`${APIURL}/api/usersCart/removeItem/${cartId}/${basketId}`, {
       method: 'DELETE',
        // headers: {
        // 'Content-Type': 'application/json',
    //  },
    //  body:JSON.stringify({ cartId, basketId } ),
      });
      const data = await response.json();
      console.log('Updated cart in removeCartItem:', data.updatedCart);
      
      return data.updatedCart;
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  const onRemoveClickItem = async ( basketId) => {//event.preventDefault()
    console.log("userscartid", usersCart.id);
    // console.log('onremoveclickeditem called with itemId:',itemId, "and basketId", basketId);
   const updatedCart = await removeCartItem( usersCart.id,basketId);  
   
   if(updatedCart) {
    setUsersCart({...usersCart, updatedCart });
    console.log('Updated cart in onRemoveClickItem:', updatedCart);
  
   } else{
    console.error("Error updating cart after removing item");
   } return updatedCart;
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