import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setFilter("All Products");
    try {
      const response = await fetch(
        "https://e-commerce-website-is92.onrender.com/products",
        {
          method: "GET",
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  }

  async function DeleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        let result = await fetch(
          `https://e-commerce-website-is92.onrender.com/product/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        result = await result.json();
        if (result) {
          getProducts();
          toast.success("Product deleted successfully!");
        } else {
          toast.error("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the product.");
      }
    } else {
      window.location.href = "/products";
    }
  }

  async function Like(id) {
    try {
      let result = await fetch(
        `https://e-commerce-website-is92.onrender.com/liked/${id}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );

      result = await result.json();

      if (result.message) {
        toast.warn("This Product is already in your LikedList");
      } else {
        toast.success("Product added successfully");
        setTimeout(() => {
          window.location.href = "/likedProducts";
        }, 4000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request.");
    }
  }

  async function Cart(id) {
    try {
      let result = await fetch(
        `https://e-commerce-website-is92.onrender.com/cart/${id}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );

      result = await result.json();

      if (result.message) {
        toast.warn("This Product is already in your cart");
      } else {
        toast.success("Product added successfully");
        setTimeout(() => {
          window.location.href = "/cart";
        }, 4000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request.");
    }
  }

  async function Filter1() {
    setFilter("10000RS - 20000RS");
    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/filter1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProducts(result);
  }
  async function Filter2() {
    setFilter("21000RS - 40000RS");

    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/filter2",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProducts(result);
  }
  async function Filter3() {
    setFilter(">=40000RS");

    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/filter3",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProducts(result);
  }

  async function Filter4() {
    setFilter("Low to high");

    try {
      let result = await fetch(
        "https://e-commerce-website-is92.onrender.com/filter4",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching products.");
    }
  }

  async function Filter5() {
    setFilter("High to low");

    try {
      let result = await fetch(
        "https://e-commerce-website-is92.onrender.com/filter5",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching products.");
    }
  }

  async function Search(e) {
    let result = await fetch(
      `https://e-commerce-website-is92.onrender.com/search/${e.target.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    result = await result.json();
    if (result) {
      setProducts(result);
    }
  }

  async function getLaptops() {
    setFilter("Laptops");

    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/products/laptops",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProducts(result);
  }
  async function getMobiles() {
    setFilter("Mobiles");

    let result = await fetch(
      "https://e-commerce-website-is92.onrender.com/products/mobiles",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    setProducts(result);
  }

  return (
    <div>
      <div className="filter-container">
        <h2>Filters</h2>

        <div className="filters">
          <button onClick={Filter1}>10000 RS-20000 RS</button>
          <button onClick={Filter2}>21000 RS-40000 RS</button>
          <button onClick={Filter3}> 40000+ RS</button>
          <button onClick={Filter4}>Low to High</button>
          <button onClick={Filter5}>High to Low</button>

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
        {isLoading ? (
          <LoadingSpinner isLoading={isLoading} />
        ) : products.length > 0 ? (
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
            <h1>Be the first to add a product</h1>
            <Link to="/addProducts" style={{ color: "white" }}>
              Add a product here
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
