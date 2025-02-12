import browseIMG1 from '../../assets/zero-waste.jpg'
import browseIMG2 from '../../assets/sustainable-fashion.jpg'
import browseIMG3 from '../../assets/sustainable-groceries.jpg'

const Browse = () => {
    return (
        <>
            <section className="browse">
                <div className='text-container'>
                    <h2>Browse The Range</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='images-container'>
                    <div>
                        <img src={browseIMG1} alt="placeholder" />
                        <p>Zero-Waste Hygiene</p>
                    </div>
                    <div>
                        <img src={browseIMG2} alt="placeholder" />
                        <p>Sustainable fashion</p>
                    </div>
                    <div>
                        <img src={browseIMG3} alt="placeholder" />
                        <p>Sustainable Groceries</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Browse