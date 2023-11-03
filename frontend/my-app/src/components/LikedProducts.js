import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LikedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Manage loading state

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      fetch("https://e-commerce-website-is92.onrender.com/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          setIsLoading(false);
          setProducts(data);
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  async function RemoveItem(id) {
    if (window.confirm("Are you sure you wanna remove this item??")) {
      let result = await fetch(
        `https://e-commerce-website-is92.onrender.com/removeLiked/${id}`,
        {
          method: "Delete",
          headers: { "Content-Type": "application/json" },
        }
      );

      result = await result.json();
      getProducts();
    } else {
      window.location.href = "/likedProducts";
    }
  }

  return (
    <div className="items-container">
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
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Empty</h1>
      )}
    </div>
  );
};

export default LikedProducts;
