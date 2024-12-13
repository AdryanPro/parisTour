import React from 'react'
import HeaderBg from '../assets/Images/homeImg.png'
import HeaderBgMobile from '../assets/Images/homeImgMobile.png'
import { Link } from 'react-router-dom'
import '../css/HomeComponent.css'
import '../css/Responsive/ResponsiveHome.css'
import Dday from '../assets/Images/D-DayCardImg.png'
import Bruges from '../assets/Images/BrugesCardImg.png'
import Versailles from '../assets/Images/VersaillesCardImg.png'
import Mont from '../assets/Images/MontCardImg.png'
import VanCard from '../assets/Images/VanCardImg.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import VanCImg1 from '../assets/Images/VanCarousel/VanCImg1.png'
import VanCImg2 from '../assets/Images/VanCarousel/VanCImg2.png'
import VanCImg3 from '../assets/Images/VanCarousel/VanCImg3.png'
export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000, // Screen size below 1000px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Below 768px
        settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        },
      },
    ],
  };

  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false, // Disable arrows
  };
  return (
    <div className='HomeWrapper'>
      <div className='Header'>
        <img src={HeaderBg} className='HeaderBg' alt="Header Bg where you can see the eiffle tower" />
        <img src={HeaderBgMobile} className='HeaderBgMobile' alt="Header Bg where you can see the eiffle tower" />
        <h1 className='H1Overlay'>Paris Tours</h1>
        <p className='textOverlay'>
          Explore a variety of destinations in ultimate 
          comfort with our audio-guided tours, traveling in 
          style aboard luxurious Mercedes Classe V vans.
        </p>
        <nav className='NavWrapper'>
          <Link className='NavBarHeaderA' to='/D-Day'>D-Day Normandie</Link>
          <Link className='NavBarHeaderA' to='/Mont-Saint-Michel'>Mont-Saint-Michel</Link>
          <Link className='NavBarHeaderA' to='/Bruges'>Bruges</Link>
          <Link className='NavBarHeaderA' to='/Versailles'>Versailles</Link>
        </nav>
      </div>

      <div className='TourSection'>
        <h1 id='SeeOurTourNavLink' className='h1SeeOurTours'>See our tour :</h1>
        <Slider {...settings} className="cardWrapper">
          <div className='Cards' onClick={() => window.location.href = '/D-Day'}>
            <img src={Dday} className='CardImg' alt="Dday" />
            <p>D-day</p>
            <p>
              The D-Day beaches in Normandy, France, are historic landmarks where Allied forces courageously 
              landed during World War II, changing the course of history.
            </p>
            <p>250€</p>
          </div>

          <div className='Cards' onClick={() => window.location.href = '/Bruges'}>
            <img src={Bruges} className='CardImg' alt="Bruges" />
            <p>Bruges</p>
            <p>
              Bruges, often called the "Venice of the North," is a beautifully preserved
               medieval city in Belgium, known for its canals, cobblestone streets, and 
               enchanting Gothic architecture.
            </p>
            <p>180€</p>
          </div>

          <div className='Cards' onClick={() => window.location.href = '/Versailles'}>
            <img src={Versailles} className='CardImg' alt="Versailles" />
            <p>Versailles</p>
            <p>
            L’Essentiel de Versailles Visite d’une demie- journée du chateaux de Versailles avec Acces Priotitaire
            </p>
            <p>100€</p>
          </div>

          <div className='Cards' onClick={() => window.location.href = '/Mont-Saint-Michel'}>
            <img src={Mont} className='CardImg' alt="Mont" />
            <p>Mont-Saint-Michel</p>
            <p>
            Audio guided tour of the Mont-Saint-Michel, day trip from Paris with luxury transportation
            </p>
            <p>180€</p>
          </div>
        </Slider>
      </div>


      <div className="Section3">
          <h1 className='Section3H1'>Unforgettable luxury tour, incredibly comfortable ride ! <br/>Accompanied by our dedicated chauffeur</h1>
      </div>

      <div className="VanPresentation">
        <div className="VanCard">
          <img src={VanCard} alt="Van Mercedes classe V" className='VanCardImg'/>
          <div className="VanCardTxt">
            <h1 className='VanH1'>Travel in Style and Comfort with Our Professional Chauffeur Services</h1>
            <p className='VanP'>
              Experience seamless, personalized transportation tailored to your needs. 
              Whether it’s a reliable airport transfer, elegant arrival at a special event, 
              or a custom journey to explore your destination, our professional chauffeurs ensure 
              punctuality, luxury, and peace of mind. Opt for our exclusive day rental service with a private 
              driver for the ultimate convenience and flexibility. Wherever you go, travel effortlessly with our 
              premier service.
            </p>
            <button className="VanBtn" onClick={() => window.location.href = '/Privatisation'}>See more</button>
            
            <br/>
          </div>
        </div>
      </div>

            {/* Second Carousel */}
      <div className="ImageCarouselSection">
        <h1 className='h1VersailleVan'>Our Van :</h1>
        <Slider {...imageCarouselSettings}>
          <div className="ImageSlide">
            <img className='VanCarouselImg' src={VanCImg1} alt="Placeholder 1" />
          </div>
          <div className="ImageSlide">
            <img className='VanCarouselImg' src={VanCImg2} alt="Placeholder 2" />
          </div>
          <div className="ImageSlide">
            <img className='VanCarouselImg' src={VanCImg3} alt="Placeholder 3" />
          </div>
        </Slider>
        <button className='VanBtn'>Reserve</button>
      </div>
    </div>
  )
}
