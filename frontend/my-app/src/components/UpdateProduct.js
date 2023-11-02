import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    ImageUrl: "",
    Model: "",
    Price: "",
    Description: "",
  });

  const params = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let result = await fetch(
      `https://e-commerce-website-is92.onrender.com/updateProduct/${params.id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    result = await result.json();
    if (result) {
      setProduct(result);
    }
  }

  async function Update(e) {
    e.preventDefault();

    if (
      !product.ImageUrl ||
      !product.Model ||
      !product.Price ||
      !product.Description
    ) {
      toast.error("All fields are required");
      return;
    }

    if (params.id === "undefined") {
      toast.error("Invalid ID");
      window.location.href = "/products";
      return;
    }

    try {
      let result = await fetch(
        `https://e-commerce-website-is92.onrender.com/updateProduct/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      result = await result.json();

      if (result) {
        toast.success("Product Updated Successfully");
        setTimeout(() => {
          window.location.href = "/products";
        }, 4000);
      } else {
        throw new Error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update product. Please try again later.");
    }
  }

  return (
    <div>
      <ToastContainer />

      <form className="signup-container" onSubmit={Update}>
        <h1>Update Product</h1>

        <input
          type="text"
          placeholder="Enter image url"
          required
          value={product.ImageUrl}
          onChange={(e) => setProduct({ ...product, ImageUrl: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter model"
          required
          value={product.Model}
          onChange={(e) => setProduct({ ...product, Model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter price"
          required
          value={product.Price}
          onChange={(e) => setProduct({ ...product, Price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter description"
          required
          value={product.Description}
          onChange={(e) =>
            setProduct({ ...product, Description: e.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
