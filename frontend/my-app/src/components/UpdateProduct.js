import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [ImageUrl, setImgurl] = useState("");
  const [Model, setModel] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const params = useParams();
  const [product, setProduct] = useState({
    ImageUrl: "",
    Model: "",
    Price: "",
    Description: "",
  });

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    let result = await fetch(
      `https://e-commerce-website-is92.onrender.com/${params.id}`,
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

    let result = await fetch(
      `https://e-commerce-website-is92.onrender.com/${params.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ImageUrl, Model, Price, Description }),
      }
    );

    result = await result.json();
    if (result) {
      alert("product updated successfully");
      window.location.href = "/products";
    }
  }

  return (
    <div>
      <div className="signup-container">
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
        <button type="submit" onClick={Update}>
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
