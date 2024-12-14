import React, { useState } from 'react'
import '../css/VanComponent.css'
import '../css/Responsive/ResponsivePrivatisation.css'
import Dday from '../assets/Images/D-DayCardImg.png'
import Bruges from '../assets/Images/BrugesAssets/BrugesImg1.png'
import Versailles from '../assets/Images/VersaillesCardImg.png' 
import Mont from '../assets/Images/MontCardImg.png'
import VanImg1 from '../assets/Images/VanRental/VanImg1.png'
import VanImg2 from '../assets/Images/VanRental/VanImg2.png'
import VanImg3 from '../assets/Images/VanRental/VanImg3.png'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default function Privatisation() {
  AOS.init();
  const slides = [VanImg1, VanImg2, VanImg3];
  const slidesMobile = [VanImg1, VanImg2, VanImg3];

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
  const price = 1250;

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
  Privatisation
  return (
    <div className="PrivatisationWrapper">
      <div className="PrivatisationHeader">
        <h1 className='PrivatisationHeaderH1' data-aos-duration="1400" data-aos="fade-down" >
        Privatisation Tour from Paris (Audio guided Tour of the Palace and  the gardens of 
        Privatisation with Priority Access) with transportation (group of 7 max)
        </h1>
        {/* <h1 className='PrivatisationHeaderMobileH1'>
        Privatisation Tour from Paris (Audio guided Tour and Privatisation with Priority Access) with <br/>transportation (group of 7 max)
        </h1> */}
      </div>
      <div className="PrivatisationShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="PrivatisationImg" />
            <button className='SliderImgBtnPrivatisation Prev' onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='PrivatisationSvg'><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </button>
            <button className='SliderImgBtnPrivatisation Next' onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='PrivatisationSvg'><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </button>
          </div>
        </div>

        <div className="PrivatisationPaymentCard" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="1000">
          <h1 className="PrivatisationPriceH1">{price} €/pers</h1>
          <h3 className='PrivatisationBuyCardH3'>Chose a date :</h3>
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
              <h3 className='PrivatisationBuyCardH3'>Available Departure Times :</h3>
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
            <p className='PrivatisationBuyCardP'>
              You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
            </p>
          )}

          <h3 className='PrivatisationPriceBuyCardH3'>Number Of People :</h3> 
          <div className="CountWrapper">
            <button onClick={decrement} className='PrivatisationBtnCounter'>-</button>
            <p className='PrivatisationCountP'>{count}</p>
            <button onClick={increment} className='PrivatisationBtnCounter'>+</button>
          </div>
          <h3 className='PrivatisationBuyCardH3'>Total : {price * count}€</h3>
          {selectedDate && selectedTime && (
            <p className='PaymentWarnning'>Payments are made in cash only at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='PrivatisationBuyCardBtn' onClick={togglePopup}>Book Now</button>
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

      <div className='PrivatisationShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="PrivatisationMobileCarouselSlide" />
            <button className='SliderImgBtnPrivatisationMobile PrevMobile' onClick={prevSlide}>
            {"<"}
            </button>
            <button className='SliderImgBtnPrivatisationMobile NextMobile' onClick={nextSlide}>
              {">"}
            </button>
          </div>
        </div>
        <div className="PrivatisationMobileCardShowAndBuyTxt">
          <p className='MobileCardTitle'>Number of  People :</p>
          <div className="CountWrapper">
            <button onClick={decrement} className='PrivatisationBtnCounter'>-</button>
            <p className='PrivatisationCountP'>{count}</p>
            <button onClick={increment} className='PrivatisationBtnCounter'>+</button>
          </div>
          <p className='MobileCardP'>{price * count}€</p>
          <div className='PrivatisationMobileDateTime'>
            <h3 className='PrivatisationBuyCardH3'>Chose a date :</h3>
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
                <h3 className='PrivatisationBuyCardH3'>Available Departure Times :</h3>
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
              <p className='PrivatisationBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='PrivatisationBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
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

        <div className='PrivatisationDescriptionSection'>
            <h2 className='PrivatisationDescriptionH2'>Description</h2>
            <div className="PrivatisationDescriptionCrard">
              <ul>
                <li>Duration : as you want half-day, full-day just contact us</li>
                <li>See the palace and all the gardens</li>
                <li>Luxury van Transportation, pick-up at your hotel (more than 4 pers)</li>
                <li>Audio-guide</li>
              </ul>
            </div>
            <h2 className='PrivatisationDescriptionTitleH2'>Experience the Best of Privatisation !</h2>
            <p className='PrivatisationDescriptionP'>
            The Palace of Privatisation, a UNESCO World Heritage site, served as the residence of French monarchs 
            Louis XIV, Louis XV, and Louis XVI, along with their courts, from 1682 until the French Revolution 
            in 1789. Through your personal headset, you’ll hear insightful commentary from your guide, allowing 
            you to discover the grandeur of Privatisation, a true symbol of royal power. Its Baroque architecture, 
            exquisite artworks, and fine furnishings were crafted by the greatest artisans of the time. After your 
            guided tour, take the time to wander through the breathtaking French-style gardens at your leisure.
            </p>
        </div>


        <div className="YouMayAlsoLikePrivatisationSection">
          <h2 className='YouMayAlsoLikePrivatisationH2'>You may also like</h2>
          <div className="PrivatisationCardWrapperYouMayAlsoLike">
            <Link to='/Bruges' className='PrivatisationLinkCard'>
              <div className='CardsPrivatisation'>
                  <img src={Bruges} className='PrivatisationCardImg' alt="Bruges" />
                  <h3 className='CardH3'>Bruges</h3>
                  <p className='CardPrivatisationP'>
                    Often called the "Venice of the North", is a charming medieval city in Belgium renowned 
                    for its picturesque canals, cobblestone streets ... 
                  </p>
                  <p className='CardPrivatisationP Price'>180€</p>
              </div>
            </Link>
            <Link to='/D-Day' className='PrivatisationLinkCard'>
              <div className='CardsPrivatisation'>
                  <img src={Dday} className='PrivatisationCardImg' alt="Dday" />
                  <h3 className='CardH3'>D-day</h3>
                  <p className='CardPrivatisationP'>
                    The D-Day beaches in Normandy, France, are the historic sites of the Allied landings on June 6, 1944, a decisive moment in World War II
                  </p>
                  <p className='CardPrivatisationP Price'>250€</p>
              </div>
            </Link>

            <Link to='/Mont-Saint-Michel' className='PrivatisationLinkCard'>
              <div className='CardsPrivatisation'>
                  <img src={Mont} className='PrivatisationCardImg' alt="Mont" />
                  <h3 className='CardH3'>Mont-Saint-Michel</h3>
                  <p className='CardPrivatisationP'>
                    Audio guided tour of the Mont-Saint-Michel, day trip from Paris with luxury transportation
                  </p>
                  <br />
                  <br />
                  <p className='CardPrivatisationP Price'>180€</p>
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
}