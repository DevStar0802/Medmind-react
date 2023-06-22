import "./App.css";
import MainPage from "./pages/MainPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./pages/Search NDC/SearchPage";
import { Flex, Link, Text } from "@chakra-ui/react";
import SearchDetailPage from "./pages/Search NDC/SearchDetailPage";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const navigate = useNavigate();
  const headerColor = "rgb(32, 33, 36)";
  return (
    <>
      <Flex
        pt="15px"
        pl="10px"
        justify="start"
        gap={7}
        bg={headerColor}
        boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
      >
        <Text color="white" size="20px">MEDMIND</Text>
        <Link onClick={() => navigate("/")} size="20px" color="white">
          Chat Page
        </Link>
        <Link onClick={() => navigate("/searchPage")} color="white">
          Search Page
        </Link>
        <Link onClick={() => navigate("/aboutPage")} color="white">
          About Page
        </Link>
      </Flex>
    </>
  );
}

export default App;
