import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import LoginForm from "./components/LoginForm";
// import { useState } from "react";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
const App = () => {
  // const [isShowLogin, setIsShowLogin] = useState(false);
  // const handelLoginClick = () => setIsShowLogin(!isShowLogin);
  return (
    <>
      <Layout>
        <LoginForm />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id/:slug" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </>
  );
};
export default App;
