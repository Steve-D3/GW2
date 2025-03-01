import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
const App = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const handelLoginClick = () => setIsShowLogin(!isShowLogin);
  return (
    <>
      <Layout handelLogin={handelLoginClick}>
        <LoginForm isShowLogin={isShowLogin} onClose={handelLoginClick} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
