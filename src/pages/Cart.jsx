import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import axios from "axios";
import  { userRequest } from "../requestMethod";


const KEY = "pk_test_f9fd3ddf5826d25939a3774ce57402d95fc696ad";

const SummaryTitle = styled.h1`
font-weight:  200;
`
const SummaryItem = styled.div`
margin: 30px 0px;
display: flex;
justify-content: space-between;

`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``


const Button = styled.button`
width:100%;
padding: 10px;
background-color: black;
color: white;
cursor: pointer;
`
function Cart() {
  const cart = useSelector(state=> state.cart);
  const [payButton, setPayButton] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        setIsLoading(true);

        // const res = await axios.post("http://localhost:3001/api/checkout/payment",
        const res = await userRequest.post("/checkout/payment", {
          key: KEY,
          amount: `${cart.total * 100}`,
          email: "ferd@gmail.com",
          metadata: {
            orderId: "123456",
          },
        });

        console.log(res.data);
        // setPaymentData(res.data);
        window.location.href=res.data.data.authorization_url
        // console.log(res.data.data);

        // history.push("/success");

      } catch (error) {
        console.error(error);
        // Handle the error
      } finally {
        setIsLoading(true);
      }
    };

    payButton && initiatePayment();
    // history.push("/success");
  }, [payButton, history, cart]);

    return (
      <div className="cart-container">
      <Navbar />
      <Announcement />
      <div className="cart-wrapper">
        <h1 className="cart-title">YOUR BAG</h1>
        <div className="cart-top">
          <button className="cart-top-button">
            CONTINUE SHOPPING
          </button>
          <div className="top-texts">
            <div className="top-text">
              Shopping Bag(2)
            </div>
            <div className="top-text">
              Your Wishlist(0)
            </div>
          </div>
          <button className="cart-top-button" style={{ border: "none", backgroundColor: "black", color: "white" }}>
            CHECKOUT NOW
          </button>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            {cart.products.map((product, index) => (
              <div className="cart-product" key={index}>
                <div className="cart-product-detail">
                  <img src={product.img} alt="" />
                  <div className="cart-details">
                    <span className="cart-product-name"> <b>Product: </b>{product.title}</span>
                    <span className="cart-product-id"> <b>ID: </b> {product._id}</span>
                    <div className="cart-product-color" style={{ backgroundColor: `${product.color}` }}></div>
                    <span className="cart-product-size"> <b>Size: </b> {product.size}</span>
                  </div>
                </div>
                <div className="cart-price-detail">
                  <div className="cart-product-amount-container">
                    <AddIcon />
                    <span className="cart-product-amount">
                      {product.quantity}
                    </span>
                    <RemoveIcon />
                  </div>
                  <span className="cart-product-price"> $ {product.price * product.quantity}</span>
                </div>
              </div>
            ))}
            </div>
          <hr />
          <div className="summary">
            <SummaryTitle>
              ORDER SUMMARY
            </SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.70</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem style={{ fontWeight: "500", fontSize: "24px" }}>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={()=> setPayButton(true)}
             disabled={isLoading}>
                {isLoading ? "Processing..." : "CHECK OUT NOW"}
             </Button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
    
    )
}

export default Cart;