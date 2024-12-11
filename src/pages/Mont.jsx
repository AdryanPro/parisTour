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
import Bruges from '../assets/Images/BrugesAssets/BrugesImg1.png'
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
        <h1 className='MontHeaderH1' data-aos-duration="1400" data-aos="fade-down">
          Audio Guided Tour to Mont Saint-Michel Day Trip from Paris <br/> 
          with luxury coach transportation (group of 7 max)
        </h1>
      </div>
      <div className="MontShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="MontImg" />
          </div>
          <button className='SliderImgBtnMont Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnMont Next' onClick={nextSlide}>
            {">"}
          </button>
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
            <p className='PaymentWarnning'>Payments are made in cash only at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='MontBuyCardBtn' onClick={togglePopup}>Book Now</button>
          
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
      

      <div className='MontShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="MontMobileCarouselSlide" />
          </div>
          <button className='SliderImgBtnMont Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnMont Next' onClick={nextSlide}>
            {">"}
          </button>
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
              <div>
                <h3 className='MontBuyCardH3'>Available Departure Times :</h3>
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
              <p className='MontBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='MontBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
                              
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

      <div className='MontDescriptionSection'>
          <h2 className='MontDescriptionH2'>Description</h2>
          <div className="MontDescriptionCrard">
            <ul>
              <li>Duration : 14h</li>
              <li>See the Mont-Saint-Michel and the Abbaye (tickets included)</li>
              <li>Luxury van Transportation, pick-up at your hotel (more than 4 pers)</li>
              <li>Audio-guide</li>
            </ul>
          </div>
          <h2 className='MontDescriptionH2'>Embark on a Customizable Day Trip Between Sea and Sky!</h2>
          <p className='MontDescriptionP'>
          Design your own itinerary as you visit one of France's most iconic landmarks, the stunning 
          Mont Saint-Michel and its bay, a UNESCO World Heritage site. Explore the magnificent medieval 
          abbey perched atop the island, a true historical masterpiece. Experience the magic of the island 
          and witness the breathtaking views of the Bay of Mont Saint-Michel, shaped by the ever-changing tides.
          Depart at 7:15 AM from the heart of Paris for an unforgettable day at Mont Saint-Michel. Enjoy the scenic 
          bus ride as you pass through the lush Normandy countryside. During the journey, listen to engaging 
          commentary from our audio guide on your phone. Arrive at Mont Saint-Michel around noon, ready for an 
          incredible experience.
          </p>
      </div>

      <div className="YouMayAlsoLikeMontSection">
        <h2 className='YouMayAlsoLikeMontH2'>You may also like</h2>
        <div className="MontCardWrapperYouMayAlsoLike">
          <Link to='/Versailles' className='MontLinkCard'>
            <div className='CardsMont'>
                <img src={Versailles} className='MontCardImg' alt="Versailles" />
                <p className='CardMontP'>
                The Palace of Versailles, a symbol of opulence and grandeur, is a UNESCO World 
                Heritage site located near Paris, France. Once the royal residence of Louis XIV, 
                it dazzles with its gilded halls, the iconic Hall of Mirrors, and sprawling, meticulously 
                landscaped gardens.
                </p>
                <p className='CardMontP Price'>115€</p>
            </div>
          </Link>
          <Link to='/D-Day' className='MontLinkCard'>
              <div className='CardsVersailles'>
                  <img src={Dday} className='VersaillesCardImg' alt="Dday" />
                  <p className='CardVersaillesP'>
                      The D-Day beaches in Normandy, France, are historic sites where Allied forces landed on 
                      June 6, 1944, marking a pivotal moment in World War II. These beaches, now serene and 
                      dotted with memorials and museums, stand as solemn reminders of the bravery and sacrifice 
                      that changed the course of history.
                  </p>
                  <p className='CardVersaillesP Price'>250€</p>
              </div>
          </Link>

          <Link to='/Bruges' className='MontLinkCard'>
            <div className='CardsMont'>
                  <img src={Bruges} className='VersaillesCardImg' alt="Dday" />
                  <p className='CardVersaillesP'>
                    Often called the "Venice of the North," is a charming medieval city in Belgium renowned 
                    for its picturesque canals, cobblestone streets ... 
                    A UNESCO World Heritage Site, it offers visitors a blend of cultural history, vibrant 
                    markets, and indulgent Belgian chocolate and beer experiences.
                  </p>
                  <p className='CardVersaillesP Price'>180€</p>
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