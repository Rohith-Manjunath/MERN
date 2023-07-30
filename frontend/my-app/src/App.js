import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Products from "./components/Products";
import PrivateComponent from "./components/PrivateComponent";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import LikedProducts from "./components/LikedProducts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/addProducts" element={<AddProducts />}></Route>
            <Route
              path="/updateProduct/:id"
              element={<UpdateProduct />}
            ></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/logout" element={<SignUp />}></Route>
            <Route path="/likedProducts" element={<LikedProducts />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
