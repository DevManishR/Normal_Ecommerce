import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import ProductDetail from "../Components/ProductDetail";
import Login from "../Components/Login";
import NavBar from "../Components/NavBar";
import PageNotFound from "../Components/PageNotFound";
import ProductCart from "../Components/ProductCart";
import Signup from "../Components/Signup";
import Wishlist from "../Components/Wishlist";
import Layout from "../Layout/index";
import Checkout from "../Components/Checkout";
export default function Routing() {
  return (
    <Router>
      
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {" "}
              <Home />{" "}
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={ <Layout> <Checkout /></Layout>} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/wishlist-items"
          element={
            <Layout>
              {" "}
              <Wishlist />{" "}
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              {" "}
              <ProductCart />{" "}
            </Layout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/product-detail/:id"
          element={
            <Layout>
              {" "}
              <ProductDetail />{" "}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
