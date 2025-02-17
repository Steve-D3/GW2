import mainIMG from "../../assets/main.jpg";
import wrapper2 from "../../assets/wrapper-img2.jpg";
import wrapper3 from "../../assets/wrapper-img3.png";

import rightArrow from "../../assets/right-arrow.svg";

const images = [
  {src: mainIMG, title: "first", id: 1},
  {src: "../../assets/wrapper-img2.jpg", title: "second", id: 2},
  {src: "../../assets/wrapper-img3.png", title: "third", id: 3},
]

const InspirationArticles = () => {
  return (
    <div className="inspirational-articles">
      {/* Left Section */}
      <div className="text-section">
        <h2>50+ Minimalist Inspirations</h2>
        <p>Our designer already made a lot of beautiful prototypes of rooms that inspire you.</p>
        <button>Explore More</button>
      </div>


      {/* Right Section */}
      <div className="wrapper">
        <div className="main-image">
          <img src={images[0].src} alt={images[0].title} />
          <div className="inner-text">
            <div>
              <p>01</p>
              <p></p>
            </div>
            <h3>Inner Peace</h3>
          </div>
          <a href="#">
            <img src={rightArrow} alt="" />
          </a>
        </div>

        <div className="sub-images">
          <div className="sub-image">
            <img src={mainIMG} alt={images[1].title} />
          </div>
          <div className="sub-image">
            <img src={wrapper2} alt={images[2].title} />
          </div>
          <div className="sub-image">
            <img src={wrapper3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default InspirationArticles;
