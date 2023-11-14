import React, { createContext, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/Search NDC/SearchPage";
import AboutPage from "../pages/AboutPage";
import SearchDetailPage from "../pages/Search NDC/SearchDetailPage";
import Login from "../pages/Login/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";
import Cart from "../pages/Cart/index.jsx";
import Checkout from "../pages/Checkout/index.jsx";
import NavigationBar from "../components/NavigationBar";
import { MyContext } from "../utilities/MyContext";

const PrivateRoutes = () => {
  const { cartItemCount, setCartItemCount } = useContext(MyContext);
  return (
    <>
      <NavigationBar
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
      />

      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/drug/:ndc" element={<SearchDetailPage />} />
        <Route path="/ndc/:ndc" element={<SearchDetailPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
