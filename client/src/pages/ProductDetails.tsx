// import ProductDetails from "../components/detail/ProductDetails";
import ProductDetailsBackup from "../components/detail/ProductDetailsBackup";
import ProductBreadcrumb from "../components/ProductBreadcrumb";
import Warranty from "../components/Warranty";
import { useEffect } from "react";

const ProductDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <>
      <ProductBreadcrumb />
      <ProductDetailsBackup />
      <Warranty />
    </>
  );
};

export default ProductDetail;
