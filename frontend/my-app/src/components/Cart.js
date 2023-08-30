import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      fetch("https://e-commerce-website-is92.onrender.com/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => setProducts(data));
    } catch (e) {
      console.log(e.message);
    }
  }

  async function RemoveItem(id) {
    if (window.confirm("Are you sure you wanna delete this item??")) {
      let result = await fetch(
        `https://e-commerce-website-is92.onrender.com/removeCart/${id}`,
        {
          method: "Delete",
          headers: { "Content-Type": "application/json" },
        }
      );

      result = await result.json();
      getProducts();
      window.location.href = "/cart";
    } else {
      window.location.href = "/cart";
    }
  }

  useEffect(() => {
    totalPrice();
  }, []);

  const totalPrice = async () => {
    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/cart/totalPrice"
    );

    result = await result.json();

    setPrice(result.totalPrice);
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
    </div>
  );
};

export default Cart;
