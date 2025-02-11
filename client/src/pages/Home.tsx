import HomePanner from "../components/HomePanner";
import HomeCategoryList from "../components/HomeCategoryList";
import InspirationArticles from "../components/InspirationArticles";
import ClientGallery from "../components/ClientGallery";
const Home = () => {
  return (
    <>
      <HomePanner />
      <hr />
      <HomeCategoryList />
      <hr />
      <InspirationArticles />
      <hr />
      <ClientGallery />
    </>
  );
};
export default Home;
