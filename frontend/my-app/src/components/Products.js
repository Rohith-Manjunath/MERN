import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
  // Use array destructuring to get the products state and the setProducts function
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setFilter("All Products");
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
    if (window.confirm("are you sure you wanna delete this product?")) {
      let result = await fetch(`http://localhost:2000/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      result = await result.json();
      if (result) {
        getProducts();
      }
    } else {
      window.location.href = "/products";
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

  async function Cart(id) {
    let result = await fetch(`http://localhost:2000/cart/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    result = await result.json();

    window.location.href = "/cart";
  }

  async function Filter1() {
    setFilter("1000RS - 10000RS");
    let result = await fetch("http://localhost:2000/filter1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }
  async function Filter2() {
    setFilter("11000RS - 20000RS");

    let result = await fetch("http://localhost:2000/filter2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }
  async function Filter3() {
    setFilter("21000RS - 30000RS");

    let result = await fetch("http://localhost:2000/filter3", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }
  async function Filter4() {
    setFilter("31000RS - 40000RS");

    let result = await fetch("http://localhost:2000/filter4", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }

  async function Search(e) {
    let result = await fetch(`http://localhost:2000/search/${e.target.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result) {
      setProducts(result);
    }
  }

  async function getLaptops() {
    setFilter("Laptops");

    let result = await fetch("http://localhost:2000/products/laptops", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }
  async function getMobiles() {
    setFilter("Laptops");

    let result = await fetch("http://localhost:2000/products/mobiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  }

  return (
    <div>
      <div className="filter-container">
        <h2>Filters</h2>

        <div className="filters">
          <button onClick={Filter1}>1000 RS-10000 RS</button>
          <button onClick={Filter2}>11000 RS-20000 RS</button>
          <button onClick={Filter3}>21000 RS-30000 RS</button>
          <button onClick={Filter4}>31000 RS-40000 RS</button>
          <button onClick={getProducts}>All</button>
          <button onClick={getLaptops}>Laptops</button>
          <button onClick={getMobiles}>Mobiles</button>
          <input
            type="text"
            placeholder="Search for products"
            onChange={Search}
          />
          <h3>{filter}</h3>
        </div>
      </div>

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
                    <button onClick={() => Cart(item._id)}>Add to cart</button>
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
    </div>
  );
};

export default Products;
