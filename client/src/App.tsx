import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import About from "./pages/About";

const App = () => {
  return (
    <>
      <Layout>
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
