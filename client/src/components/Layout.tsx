// import { type ReactNode } from "react";
// import Footer from "./Footer";
// import Header from "./home/Header";

// type LayoutProps = {
//   children: ReactNode;
// };

// const layout = ({ children }: LayoutProps) => {
//   return (
//     <>
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// };
// export default layout;
import { useState } from "react";
import Footer from "./Footer";
import Header from "./home/Header";
import FavoritesPanel from "../components/FavoritesPanel"; // You’ll create this soon
import { Outlet } from "react-router-dom";

// type LayoutProps = {
//   children: ReactNode;
// };

const Layout = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <>
      <Header
        onToggleFavorites={() => setShowFavorites(!showFavorites)}
        favoritesCount={favorites.length}
      />
      <FavoritesPanel
        show={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <Outlet context={{ favorites, toggleFavorite }} />
      <Footer />
    </>
  );
};

export default Layout;
