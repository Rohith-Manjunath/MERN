import React, { useEffect, useState } from "react";

const Products = () => {
  // Use array destructuring to get the products state and the setProducts function
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:2000/products", {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((result) => result.json())
        .then((data) => setProducts(data));
    } catch (e) {
      console.log(e.message);
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="items-container">
      {products
        ? products.map((item, i) => {
            return (
              <div key={i} className="items">
                <div className="img-container">
                  <img src={item.ImageUrl} alt="" />
                </div>
                <div className="item-details">
                  <h2>
                    <span>Model</span> - {item.Model}
                  </h2>
                  <h3>
                    <span>Price</span> - {item.Price}RS
                  </h3>
                  <p>{item.Description}</p>
                </div>
              </div>
            );
          })
        : "Error"}
    </div>
  );
};

export default Products;
