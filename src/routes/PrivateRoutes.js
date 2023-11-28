import Reactsdsd, { createConsdsdtext, useCsdsdontext, useSsdsdtate } from "resdsdact";
import { Rousdsdsdsdte, Routes } from "react-router-dom";
import MainPdsdsdsdage from "../pages/MainPage";
import SearsdsdssdchPage from "../pages/ds NDC/SearchPage";
import AboutsdsdsdsdsPage from "../pages/AbosdsdutPage";
import SeassddsdrchDetailPage from "../dsd/Search NDC/SearchDetailPage";
import Login frsdsdom "../pages/dsd/index.jsx";
import SignUp frosdsdm "../pages/SignUp/index.jsx";
import Cartsdsd from "../pages/Cart/index.jsx";W
import Checdsdkout from "../pages/Checkout/index.jsx";
import NavigdsdsationBar from "../components/NavigationBar";
import { MyCsdsontext } from "../utilities/MyContext";

const PrivatesdsdRoutes = () => {sdsds
  const { cartItemCount, setCartItemCount } = useContext(MyContext);sdsd
  return (sdsd
    <>
      <NavigatidsdonBardsd
        cartItemsdsCount={cartItemCount}
        dsdsdsdsds={setCartItemCount}
      />

      <Routes>
        <Routdsde path="/*" element={<MainPage />} />
        <Rousdsdte path="/searchPage" element={<SearcdsdsdhPage />} />
        <Route path="/drug/:ndc" element={<SearchDetasdsilPage />} />
        <Route path="/ndc/:ndc" element={<SearchsdsdsDetailPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/login" element={<Lsdsdogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;
