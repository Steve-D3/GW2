import Banner from "./Banner"
import '../../styles/home.css'
import Browse from "./Browse"
import InspirationArticles from "./InspirationArticles"
import ProductGridHome from "./ProductGridHome"

const HomePanel = () => {
  return (
    <>
    <Banner />
    <Browse />
    <ProductGridHome />
    <InspirationArticles />
    </>
  )
}
export default HomePanel
