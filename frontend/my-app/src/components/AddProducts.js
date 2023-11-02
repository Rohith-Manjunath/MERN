import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProducts = () => {
  const [ImageUrl, setImgurl] = useState("");
  const [Model, setModel] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");

  async function addProducts(e) {
    e.preventDefault();

    if (Category !== "Mobile" && Category !== "Laptop") {
      toast.error("Category type should be Mobile/Laptop");
      return;
    }

    try {
      let result = await fetch(
        "https://e-commerce-website-is92.onrender.com/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ImageUrl,
            Model,
            Price,
            Description,
            Category,
          }),
        }
      );

      if (result.ok) {
        toast.success("Product added successfully!");

        setTimeout(() => {
          window.location.href = "/products";
        }, 4000);
      } else {
        throw new Error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product. Please try again later.");
    }
  }

  return (
    <form className="signup-container" onSubmit={addProducts}>
      <ToastContainer />
      <h1>Add Product</h1>

      <input
        type="text"
        placeholder="Enter image url"
        required
        onChange={(e) => setImgurl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter model"
        required
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter price"
        required
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter description"
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Category (Mobile/Laptop)"
        required
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProducts;
