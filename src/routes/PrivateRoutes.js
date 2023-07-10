import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/Search NDC/SearchPage";
import AboutPage from "../pages/AboutPage";
import SearchDetailPage from "../pages/Search NDC/SearchDetailPage";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchDetail" element={<SearchDetailPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
