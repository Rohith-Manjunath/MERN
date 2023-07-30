import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
  // Use array destructuring to get the products state and the setProducts function
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
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
  }
  async function DeleteProduct(id) {
    let result = await fetch(`http://localhost:2000/product/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();
    if (result) {
      getProducts();
    }
  }

  async function Like(id) {
    let result = await fetch(`http://localhost:2000/liked/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    result = await result.json();

    window.location.href = "/likedProducts";
  }

  return (
    <div className="items-container">
      {products.length > 0 ? (
        products.map((item, i) => {
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
                <div className="update-delete">
                  <NavLink to={"/updateProduct/" + item._id}>Update</NavLink>
                  <button onClick={() => DeleteProduct(item._id)}>
                    Delete
                  </button>
                  <button onClick={() => Like(item._id)}>Like</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="addProductLink">
          <h1>Be first to add product</h1>
          <Link to="/addProducts">Add product here</Link>
        </div>
      )}
    </div>
  );
};

export default Products;
