import React from "react";
import { Link } from "react-router-dom";
import '../css/checkout.css';

const Checkout =()=> {

  return(
    <div className="checkout">
    <form className="shipping">
      <div>Shipping Address</div>
      <input className="address" type ="text" placeholder="Address"></input>
      <input className="city" type ="text" placeholder="City"></input>
      <input className="state" type ="text" placeholder="State"></input>
      <input className="zip" type ="text" placeholder="Zip Code"></input>
    </form>
    <form className="creditcard">
      <div>Credit Card</div>
      <input className="number" type ="number" placeholder ="16 Digit Card Number"></input>
      <input className="expire" type ="number" placeholder ="Expiration Date MM/YY"></input>
      <input className="code" type ="number" placeholder ="Security Code"></input>
      <input className="cardzip" type ="number" placeholder="Zip Code"></input>
    </form>
    <Link to ='/ordercomplete'><button>Place Order</button></Link>
    </div>
  )
}

export default Checkout;