import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    getProducts();
    totalPrice();
  }, []); // Run getProducts and totalPrice on component mount

  async function getProducts() {
    try {
      const response = await fetch(
        "https://e-commerce-website-is92.onrender.com/cart",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function RemoveItem(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(
          `https://e-commerce-website-is92.onrender.com/removeCart/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        getProducts();
        totalPrice();
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  async function totalPrice() {
    try {
      const response = await fetch(
        "https://e-commerce-website-is92.onrender.com/cart/totalPrice"
      );
      const data = await response.json();
      setPrice(data.totalPrice);
    } catch (error) {
      console.error(error.message);
    }
  }
  const handlePayment = async () => {
    try {
      const res = await fetch(
        "https://payment-mxqy.onrender.com/auth/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            items: products.map((item) => ({
              id: item._id,
              quantity: 1, // You might need to adjust the quantity based on your logic
              price: item.Price,
              name: item.Model,
            })),
          }),
        }
      );

      const data = await res.json();
      console.log(data.url);
      // Handle the payment response here, for example, redirecting the user to the payment URL
      window.location.href = data.url;
    } catch (error) {
      console.error(error.message);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <div className="items-container">
      <h2>
        Total : {price} RS
        <p style={{ backgroundColor: "red", color: "white" }}>
          Total Items - {products.length}
        </p>
      </h2>

      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : products.length > 0 ? (
        products.map((item, i) => (
          <div key={i} className="items">
            <div className="img-container">
              <img src={item.ImageUrl} alt="" />
            </div>
            <div className="item-details">
              <h2>
                <span>Model</span> - {item.Model}
              </h2>
              <h3>
                <span>Price</span> - {item.Price}
              </h3>
              <p>{item.Description}</p>
              <div className="update-delete">
                <button onClick={() => RemoveItem(item._id)}>Remove</button>
                <Link to="/products">Add more items</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Cart is empty</h1>
      )}

      {products.length > 0 && (
        <button className="payment-button" onClick={() => handlePayment()}>
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Cart;
