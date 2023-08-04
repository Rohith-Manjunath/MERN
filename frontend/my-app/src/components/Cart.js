import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      fetch("http://localhost:2000/cart", {
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
    let result = await fetch(`http://localhost:2000/removeCart/${id}`, {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();
    getProducts();
  }

  return (
    <div className="items-container">
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
