import React, { useState } from 'react'
import "../css/MontComponent.css"
import "../css/Responsive/ResponsiveMont.css"
import MontImg1 from '../assets/Images/MontAssets/MontImg1.png'
import MontImg2 from '../assets/Images/MontAssets/MontImg2.png'
import MontImg3 from '../assets/Images/MontAssets/MontImg3.png'
import MontImg4 from '../assets/Images/MontAssets/MontImg4.png'
import MontImg5 from '../assets/Images/MontAssets/MontImg5.png'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com';
import Bruges from '../assets/Images/BrugesCardImg.png'
import Versailles from '../assets/Images/VersaillesCardImg.png' 
import Dday from '../assets/Images/D-DayCardImg.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default function Mont() {
  AOS.init();
  const slides = [MontImg1, MontImg2, MontImg3, MontImg4, MontImg5];
  const slidesMobile = [MontImg1, MontImg2, MontImg3, MontImg4, MontImg5];

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
      link: "/Bruges",
      image: Bruges,
      title: "Bruges",
      price: "180€",
      p: "Often called the 'Venice of the North', is a charming medieval city in Belgium renowned for its picturesque canals, cobblestone streets, and well-preserved Gothic architecture. A UNESCO World Heritage Site, it offers visitors a blend of cultural history, vibrant markets, and indulgent Belgian chocolate and beer experiences."
    },
    {
      link: "/D-Day",
      image: Dday,
      title: "D-DAY",
      price: "250€",
      p: 'The D-Day beaches in Normandy, France, are historic sites where Allied forces landed on June 6, 1944, marking a pivotal moment in World War II. These beaches, now serene and dotted with memorials and museums, stand as solemn reminders of the bravery and sacrifice that changed the course of history.'
    },
    {
      link: "/Versailles",
      image: Versailles,
      title: "Versailles",
      price: "100€",
      p: 'The Palace of Versailles, a symbol of opulence and grandeur, is a UNESCO World Heritage site located near Paris, France. Once the royal residence of Louis XIV, it dazzles with its gilded halls, the iconic Hall of Mirrors, and sprawling, meticulously landscaped gardens.'
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
    <div className="MontWrapper">
      <div className="MontHeader">
        <h1 className='MontHeaderH1' data-aos-duration="1400" data-aos="fade-down" >
        Audio Guided Tour to Mont Saint-Michel Day Trip from Paris with luxury coach transportation 
        (group of 7 max)
        </h1>
        {/* <h1 className='MontHeaderMobileH1'>
        Mont Tour from Paris (Audio guided Tour and Mont with Priority Access) with <br/>transportation (group of 7 max)
        </h1> */}
      </div>
      <div className="MontShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="MontImg" />
            <button className='SliderImgBtnMont Prev' onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='MontSvg'><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </button>
            <button className='SliderImgBtnMont Next' onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='MontSvg'><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </button>
          </div>
        </div>

        <div className="MontPaymentCard" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="1000">
          <h1 className="MontPriceH1">{price} €/pers</h1>
          <h3 className='MontBuyCardH3'>Chose a date :</h3>
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
              <h3 className='MontBuyCardH3'>Available Departure Times :</h3>
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
            <p className='MontBuyCardP'>
              You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
            </p>
          )}

          <h3 className='MontPriceBuyCardH3'>Number Of People :</h3> 
          <div className="CountWrapper">
            <button onClick={decrement} className='MontBtnCounter'>-</button>
            <p className='MontCountP'>{count}</p>
            <button onClick={increment} className='MontBtnCounter'>+</button>
          </div>
          <h3 className='MontBuyCardH3'>Total : {price * count}€</h3>
          {selectedDate && selectedTime && (
            <p className='PaymentWarnning'>Payments are made by card or cash at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='MontBuyCardBtn' onClick={togglePopup}>Book Now</button>
        </div>
      </div>
                                    {/* Popup PC */}
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
            </form>
            <button type="button" onClick={togglePopup} className='popupCloseButton'>
                Close
            </button>
          </div>
        </div>
      )}

      <div className='MontShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="MontMobileCarouselSlide" />
            <button className='SliderImgBtnMontMobile PrevMobile' onClick={prevSlide}>
            {"<"}
            </button>
            <button className='SliderImgBtnMontMobile NextMobile' onClick={nextSlide}>
              {">"}
            </button>
          </div>
        </div>
        <div className="MontMobileCardShowAndBuyTxt">
          <p className='MobileCardTitle'>Number of  People :</p>
          <div className="CountWrapper">
            <button onClick={decrement} className='MontBtnCounter'>-</button>
            <p className='MontCountP'>{count}</p>
            <button onClick={increment} className='MontBtnCounter'>+</button>
          </div>
          <p className='MobileCardP'>{price * count}€</p>
          <div className='MontMobileDateTime'>
            <h3 className='MontBuyCardH3'>Chose a date :</h3>
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
              <div className='DepatureTimeDiv'>
                <h3 className='MontBuyCardH3'>Available Departure Times :</h3>
                <select
                  className='TimeSelecteur'
                  value={selectedTime}
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
              <p className='MontBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='MontBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
        </div>
      </div>
                                    {/* Popup mobile */}
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

        <div className='MontDescriptionSection'>
            <h2 className='MontDescriptionH2'>Description</h2>
            <div className="MontDescriptionCrard">
              <ul>
                <li>Duration : 14h(Flexible is necessary)</li>
                <li>See the Mont-Saint-Michel and the Abbaye (tickets included)</li>
                <li>Luxury van Transportation, pick-up at your hotel (4 pers or more)</li>
                <li>Audio-guide</li>
              </ul>
            </div>
            <h2 className='MontDescriptionTitleH2'>Embark on a Customizable Day Trip Between Sea and Sky!</h2>
            <p className='MontDescriptionP'>
            Design your own itinerary as you visit one of France's most iconic landmarks,
            the stunning Mont Saint-Michel and its bay, a UNESCO World Heritage site. Explore
            the magnificent medieval abbey perched atop the island, a true historical masterpiece.
            Experience the magic of the island and witness the breathtaking views of the Bay of
            Mont Saint-Michel, shaped by the ever-changing tides.
            Depart at 7:15 AM from the heart of Paris for an unforgettable day at Mont
            Saint-Michel. Enjoy the scenic bus ride as you pass through the lush Normandy countryside.
            During the journey, listen to engaging commentary from our audio guide on your phone. Arrive at
            Mont Saint-Michel around noon, ready for an incredible experience.
            </p>
        </div>


        <div className="YouMayAlsoLikeMontSection">
          <h2 className='YouMayAlsoLikeMontH2'>You may also like</h2>
          <div className="MontCardWrapperYouMayAlsoLike">
            <Link to='/Bruges' className='MontLinkCard'>
              <div className='CardsMont'>
                  <img src={Bruges} className='MontCardImg' alt="Bruges" />
                  <h3 className='CardH3'>Bruges</h3>
                  <p className='CardMontP'>
                    Often called the "Venice of the North", is a charming medieval city in Belgium renowned 
                    for its picturesque canals, cobblestone streets ... 
                  </p>
                  <p className='CardMontP Price'>180€</p>
              </div>
            </Link>
            <Link to='/D-Day' className='MontLinkCard'>
              <div className='CardsMont'>
                  <img src={Dday} className='MontCardImg' alt="Dday" />
                  <h3 className='CardH3'>D-day</h3>
                  <p className='CardMontP'>
                    The D-Day beaches in Normandy, France, are the historic sites of the Allied landings on June 6, 1944, a decisive moment in World War II
                  </p>
                  <p className='CardMontP Price'>250€</p>
              </div>
            </Link>

            <Link to='/Versailles' className='MontLinkCard'>
              <div className='CardsMont'>
                  <img src={Versailles} className='MontCardImg' alt="Versailles" />
                  <p className='CardMontP'>
                  The Palace of Versailles once the royal residence of Louis XIV, a symbol of opulence and grandeur, is a UNESCO World 
                  Heritage site located near Paris, France.
                  </p>
                  <p className='CardMontP Price'>115€</p>
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