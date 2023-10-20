import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

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
        "https://e-commerce-website-is92.onrender.com/checkout",
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
      window.location = data.url;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="items-container">
      <h2>Total : {price} RS</h2>

      {products.length > 0 ? (
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
