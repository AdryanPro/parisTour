import React, { useState } from 'react'
import '../css/BrugesComponent.css'
import '../css/Responsive/ResponsiveBruges.css'
import BrugesImg1 from '../assets/Images/BrugesAssets/BrugesImg1.png'
import BrugesImg2 from '../assets/Images/BrugesAssets/BrugesImg2.png'
import BrugesImg3 from '../assets/Images/BrugesAssets/BrugesImg3.png'
import Dday from '../assets/Images/D-DayCardImg.png'
import Versailles from '../assets/Images/VersaillesCardImg.png' 
import Mont from '../assets/Images/MontCardImg.png'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default function Bruges() {
  AOS.init();
  const slides = [BrugesImg1, BrugesImg2, BrugesImg3];
  const slidesMobile = [BrugesImg1, BrugesImg2, BrugesImg3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };


  const [count, setCount] = useState(1);
  const increment = () => {
    if (count < 7) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  // Get today's date in YYYY-MM-DD format
  // const today = new Date().toISOString().split("T")[0];

  const dateTimeLocal = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000
  ).toISOString().slice(0, 16);
  // State to manage selected date and time
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  
  //Change the format of the DATE
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year.slice(2)}`;
  };

  // General departure times available every day
  const departureTimes = ["07:30 AM"];
  
  //PopUp handeler
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a departure time before booking.");
      return;
    }
    setIsPopupVisible(!isPopupVisible);
  };
  //Set the price 
  const price = 180;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.firstName.trim()) validationErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) validationErrors.lastName = 'Last Name is required';
    if (!formData.phoneNumber.trim()) validationErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const UserId = "service_e2eqntv";
    const templateId = "template_3oidqlb"
    const publicKey = "Tp1BEybTug-UIAbgG"

    // Prepare template parameters
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      date: selectedDate,
      time: selectedTime,
      total: price,
    };

    try {
      const result = await emailjs.send(
        UserId, // Replace with your EmailJS service ID
        templateId, // Replace with your EmailJS template ID
        templateParams,
        publicKey // Replace with your EmailJS public key
      );

      console.log('Email sent successfully:', result);
      setIsPopupVisible(false);
      alert('Your booking request has been sent!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending your booking request.');
    }
  };

      ///carousel for the cards

  const cards = [
    {
      link: "/Versailles",
      image: Versailles,
      title: "Versailles",
      price: "100€",
      p: 'The Palace of Versailles, a symbol of opulence and grandeur, is a UNESCO World Heritage site located near Paris, France. Once the royal residence of Louis XIV, it dazzles with its gilded halls, the iconic Hall of Mirrors, and sprawling, meticulously landscaped gardens.'
    },
    {
      link: "/D-Day",
      image: Dday,
      title: "D-DAY",
      price: "250€",
      p: 'The D-Day beaches in Normandy, France, are historic sites where Allied forces landed on June 6, 1944, marking a pivotal moment in World War II. These beaches, now serene and dotted with memorials and museums, stand as solemn reminders of the bravery and sacrifice that changed the course of history.'
    },
    {
      link: "/Mont-Saint-Michel",
      image: Mont,
      title: "Mont-Saint-Michel",
      price: "180€",
      p:'L’Essentiel de Versailles (Visite d’une demie- journée du chateaux de Versailles avec Acces Priotitaire'
    },
  ];

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const nextCard = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="BrugesWrapper">
      <div className="BrugesHeader">
        <h1 className='BrugesHeaderH1' data-aos-duration="1400" data-aos="fade-down">
          Transport from Paris to Bruges Day Trip and Audio Guided Tour <br/>
          in a small group (1-7)
        </h1>
      </div>
      <div className="BrugesShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="BrugesImg" />
          </div>
          <button className='SliderImgBtnBruges Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnBruges Next' onClick={nextSlide}>
            {">"}
          </button>
        </div>

        <div className="BrugesPaymentCard" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="1000">
          <h1 className="BrugesPriceH1">{price} €/pers</h1>
          <h3 className='BrugesBuyCardH3'>Chose a date :</h3>
          <form>
            <input type="date"
            className='DateSelecteur'
            defaultValue={dateTimeLocal}
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            />
          </form>
          

          {/* Show available times only if a date is selected */}
          {selectedDate && (
            <div>
              <h3 className='BrugesBuyCardH3'>Available Departure Times :</h3>
              <select
                value={selectedTime}
                className='DateSelecteur'
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select a time</option>
                {departureTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}
                    {/* Show the selected date and time */}
          {selectedDate && selectedTime && (
            <p className='BrugesBuyCardP'>
              You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
            </p>
          )}

          <h3 className='BrugesPriceBuyCardH3'>Number Of People :</h3> 
          <div className="CountWrapper">
            <button onClick={decrement} className='BrugesBtnCounter'>-</button>
            <p className='BrugesCountP'>{count}</p>
            <button onClick={increment} className='BrugesBtnCounter'>+</button>
          </div>
          <h3 className='BrugesBuyCardH3'>Total : {price * count}€</h3>
          {selectedDate && selectedTime && (
            <p className='PaymentWarnning'>Payments are made in cash only at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='BrugesBuyCardBtn' onClick={togglePopup}>Book Now</button>
          
                              {/* Popup */}
            {isPopupVisible && (
              <div className='popupOverlayStyle FlexWrapper' style={popupOverlayStyle}>
                <div className='popupContentStyle' style={popupContentStyle}>
                  <h2 className='PopUpH1'>Check out</h2>
                  <form onSubmit={handleSubmit} className='FormPopUp'>
                    <div className='LabelInputDiv'>
                    <label htmlFor="lastName" className='LabelPopUp' >First Name:</label><br />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={errors.firstName ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="lastName" className='LabelPopUp' >Last Name:</label><br />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={errors.lastName ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="phoneNumber" className='LabelPopUp'>Phone Number:</label><br />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        style={errors.phoneNumber ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="email" className='LabelPopUp'>Email:</label><br />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={errors.email ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                        <p>You have selected the {formatDate(selectedDate)} at {selectedTime}</p>
                        <p>Total :  {price * count}€</p>
                    </div>
                    
                    <button type="submit" className='popupSubmitButton'>
                      Submit
                    </button>
                    {/* <button type="button" onClick={togglePopup} className='popupCloseButton'>
                      Close
                    </button> */}
                  </form>
                  <button type="button" onClick={togglePopup} className='popupCloseButton'>
                      Close
                    </button>
                  {/* <button onClick={togglePopup}>Close</button> */}
                </div>
              </div>
            )}
        </div>
      </div>

      <div className='BrugesShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="BrugesMobileCarouselSlide" />
          </div>
          <button className='SliderImgBtnBruges Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnBruges Next' onClick={nextSlide}>
            {">"}
          </button>
        </div>
        <div className="BrugesMobileCardShowAndBuyTxt">
          <p className='MobileCardTitle'>Number of  People :</p>
          <div className="CountWrapper">
            <button onClick={decrement} className='BrugesBtnCounter'>-</button>
            <p className='BrugesCountP'>{count}</p>
            <button onClick={increment} className='BrugesBtnCounter'>+</button>
          </div>
          <p className='MobileCardP'>{price * count}€</p>
          <div className='BrugesMobileDateTime'>
            <h3 className='BrugesBuyCardH3'>Chose a date :</h3>
            <form>
              <input type="date"
              className='DateSelecteur'
              defaultValue={dateTimeLocal}
              min={today}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              />
            </form>
            
            {/* Show available times only if a date is selected */}
            {selectedDate && (
              <div>
                <h3 className='BrugesBuyCardH3'>Available Departure Times :</h3>
                <select
                  value={selectedTime}
                  className='TimeSelecteur'
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  {departureTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}
                      {/* Show the selected date and time */}
            {selectedDate && selectedTime && (
              <p className='BrugesBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='BrugesBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
                              
                              {/* Popup */}
            {isPopupVisible && (
              <div className='popupOverlayStyle FlexWrapper' style={popupOverlayStyle}>
                <div className='popupContentStyle' style={popupContentStyle}>
                  <h2 className='PopUpH1'>Check out</h2>
                  <form onSubmit={handleSubmit} className='FormPopUp'>
                    <div className='LabelInputDiv'>
                    <label htmlFor="lastName" className='LabelPopUp' >First Name:</label><br />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={errors.firstName ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="lastName" className='LabelPopUp' >Last Name:</label><br />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={errors.lastName ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="phoneNumber" className='LabelPopUp'>Phone Number:</label><br />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        style={errors.phoneNumber ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                    </div>
                    <div className='LabelInputDiv'>
                      <label htmlFor="email" className='LabelPopUp'>Email:</label><br />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={errors.email ? { border: '2px solid red' } : {}}
                        className='InputPopUp'
                      />
                        <p>You have selected the {formatDate(selectedDate)} at {selectedTime}</p>
                        <p>Total :  {price * count}€</p>
                    </div>
                    
                    <button type="submit" className='popupSubmitButton'>
                      Submit
                    </button>
                    <button type="button" onClick={togglePopup} className='popupCloseButton'>
                      Close
                    </button>
                  </form>
                </div>
              </div>
            )}
          
        </div>
      </div>

      <div className='BrugesDescriptionSection'>
          <h2 className='BrugesDescriptionH2'>Description</h2>
          <div className="BrugesDescriptionCrard">
            <ul>
              <li>Visit the historic city, classified as a world heritage site by UNESCO</li>
              <li>Duration 14h</li>
              <li>Luxury van Transportation, pick-up at your hotel (more than 4 pers)</li>
              <li>Audio-guide</li>
            </ul>
          </div>
          <h2 className='BrugesDescriptionH2'>Explore Bruges, the "Venice of the North," at Your Own Pace</h2>
          <p className='BrugesDescriptionP'>
            Depart at 7:15 a.m. from Paris in a comfortable, air-conditioned bus, arriving in Bruges by 11:00 a.m. 
            Begin your visit by exploring the city and enjoying a lunch of traditional Belgian cuisine, like 
            moules-frites or waffles. Discover Bruges’s UNESCO-listed medieval center with an audio guide, strolling 
            through picturesque streets and admiring landmarks such as the Belfry, Church of Our Lady, and the 
            Beguinage. You can also visit museums or enjoy a canal cruise (not included).
             The bus departs at 4:30 p.m., returning to Paris around 9:00 p.m
          </p>
      </div>


      <div className="YouMayAlsoLikeBrugesSection">
        <h2 className='YouMayAlsoLikeBrugesH2'>You may also like</h2>
        <div className="BrugesCardWrapperYouMayAlsoLike">
          <Link to='/Versailles' className='BrugesLinkCard'>
            <div className='CardsBruges'>
                <img src={Versailles} className='BrugesCardImg' alt="Versailles" />
                <p className='CardBrugesP'>
                The Palace of Versailles, a symbol of opulence and grandeur, is a UNESCO World 
                Heritage site located near Paris, France. Once the royal residence of Louis XIV, 
                it dazzles with its gilded halls, the iconic Hall of Mirrors, and sprawling, meticulously 
                landscaped gardens.
                </p>
                <p className='CardBrugesP Price'>100€</p>
            </div>
          </Link>
          <Link to='/D-Day' className='BrugesLinkCard'>
            <div className='CardsBruges'>
                <img src={Dday} className='BrugesCardImg' alt="Dday" />
                <p className='CardBrugesP'>
                      The D-Day beaches in Normandy, France, are historic sites where Allied forces landed on 
                      June 6, 1944, marking a pivotal moment in World War II. These beaches, now serene and 
                      dotted with memorials and museums, stand as solemn reminders of the bravery and sacrifice 
                      that changed the course of history.
                  </p>
                <p className='CardBrugesP Price'>250€</p>
            </div>
          </Link>

          <Link to='/Mont-Saint-Michel' className='BrugesLinkCard'>
            <div className='CardsBruges'>
                <img src={Mont} className='BrugesCardImg' alt="Mont" />
                <p className='CardVersaillesP'>
                  Mont Saint-Michel, a breathtaking medieval abbey perched atop a rocky island, 
                  is one of France's most iconic landmarks. Surrounded by dramatic tidal waters, 
                  it seamlessly blends natural beauty with architectural grandeur, offering an 
                  unforgettable experience.
                  </p>
                <p className='CardBrugesP Price'>180€</p>
            </div>
          </Link>
        </div>
      </div>


      <div className="YouMayAlsoLikeMobile">
        <h2 className="YouMayAlsoLikeMobileH2">You may also like</h2>
        <div className="carousel-container">
          <div className="carousel-slide">
            <Link to={cards[currentCarouselIndex].link} className="carousel-card">
              <div className="CardMobile">
                <img
                  src={cards[currentCarouselIndex].image}
                  className="CardMobileImg"
                  alt={cards[currentCarouselIndex].title}
                />
                <p className="CardMobileTitle">{cards[currentCarouselIndex].title}</p>
                <p className="CardMobilePrice">{cards[currentCarouselIndex].price}</p>
                <p className="CardMobileTxt">{cards[currentCarouselIndex].p}</p>
              </div>
            </Link>
          </div>
        </div>
        <button className="carousel-button prev" onClick={prevCard}>
            {"<"}
          </button>
          <button className="carousel-button next" onClick={nextCard}>
            {">"}
          </button>
      </div>
    </div>
  );
};

const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  overflow: "hidden",
};