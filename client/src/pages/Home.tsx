import HomeCategoryList from "../components/HomeCategoryList";
import InspirationArticles from "../components/InspirationArticles";
import ClientGallery from "../components/ClientGallery";
import HomePanel from "../components/home/HomePanel";
const Home = () => {
  return (
    <>
      <HomePanel />
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
