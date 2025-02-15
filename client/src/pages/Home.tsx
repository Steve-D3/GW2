import HomeCategoryList from "../components/HomeCategoryList";
import InspirationArticles from "../components/InspirationArticles";
import ClientsGallery from "../components/ClientsGallery";
import HomePanel from "../components/home/HomePanel";
import ProductGrid from "../components/ProductGrid";
const Home = () => {
  return (
    <>
      <HomePanel />
      <hr />
      <HomeCategoryList />
      <hr />
      <ProductGrid />
      <hr />
      <InspirationArticles />
      <hr />
      <ClientsGallery />
    </>
  );
};
export default Home;
