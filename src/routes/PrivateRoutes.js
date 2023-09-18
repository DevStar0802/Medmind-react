import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/Search NDC/SearchPage";
import AboutPage from "../pages/AboutPage";
import SearchDetailPage from "../pages/Search NDC/SearchDetailPage";
import Login from "../pages/Login/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";
import Checkout from "../pages/Checkout/index.jsx";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchDetail" element={<SearchDetailPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
