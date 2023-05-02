import React from "react";
import { Link } from "react-router-dom";

const Checkout =()=> {

  return(
    <>
    <form>
      <div>Shipping Address</div>
      <input type ="text" placeholder="Address"></input>
      <input type ="text" placeholder="Address"></input>
      <input type ="text" placeholder="City"></input>
      <input type ="text" placeholder="State"></input>
      <input type ="text" placeholder="Zip Code"></input>
    </form>
    <form>
      <div>Credit Card</div>
      <input type ="number" placeholder ="16 Digit Card Number"></input>
      <input type ="number" placeholder ="Expiration Date MM/YY"></input>
      <input type ="number" placeholder ="Security Code"></input>
      <input type ="number" placeholder="Zip Code"></input>
    </form>
    <Link to ='/ordercomplete'><button>Place Order</button></Link>
    </>
  )
}

export default Checkout;