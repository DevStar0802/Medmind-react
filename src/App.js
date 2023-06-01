import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/Search NDC/SearchPage";
import { Flex, Link, Text } from "@chakra-ui/react";
import SearchDetailPage from "./pages/Search NDC/SearchDetailPage";

function App() {
  const navigate = useNavigate();
  const headerColor = "rgb(32, 33, 36)";
  return (
    <>
      <Flex
        p="20px"
        justify="start"
        gap={7}
        bg={headerColor}
        boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
      >
        <Link onClick={() => navigate("/")} size="20px" color="white">
          Chat Page
        </Link>
        <Link onClick={() => navigate("/searchPage")} color="white">
          Search Page
        </Link>
        {/* <Link onClick={() => navigate("/searchDetail")} color="white">
          Search Detail
        </Link> */}
      </Flex>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
        <Route path="/searchDetail" element={<SearchDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
