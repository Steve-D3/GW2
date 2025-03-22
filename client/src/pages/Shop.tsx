
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import Warranty from "../components/Warranty";
import { useOutletContext } from "react-router-dom";

const Shop = () => {
  const { favorites, toggleFavorite } = useOutletContext<{
    favorites: string[];
    toggleFavorite: (id: string) => void;
  }>();

  return (
    <>
      <ProductFilter />
      <ProductGrid favorites={favorites} toggleFavorite={toggleFavorite} />
      <Warranty />
    </>
  );
};

export default Shop;
