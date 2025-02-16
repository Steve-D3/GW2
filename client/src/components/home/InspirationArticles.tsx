import mainIMG from "../../assets/main.jpg";

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
          <img src={mainIMG} alt="" />

        </div>
      </div>
    </div>
  );
};
export default InspirationArticles;
