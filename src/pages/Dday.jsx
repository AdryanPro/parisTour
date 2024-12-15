import React, { useState } from 'react'
import '../css/DdayComponent.css'
import '../css/Responsive/ResponsiveDday.css'
import DdayImg1 from '../assets/Images/DdayAssets/DdayImg1.png'
import DdayImg2 from '../assets/Images/DdayAssets/DdayImg2.png'
import DdayImg3 from '../assets/Images/DdayAssets/DdayImg3.png'
import DdayImg4 from '../assets/Images/DdayAssets/DdayImg4.png'
import Bruges from '../assets/Images/BrugesCardImg.png'
import Versailles from '../assets/Images/VersaillesCardImg.png' 
import Mont from '../assets/Images/MontCardImg.png'
import { Link } from 'react-router-dom'
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

export default function Dday() {
  AOS.init();
  const slides = [DdayImg1, DdayImg2, DdayImg3, DdayImg4];
  const slidesMobile = [DdayImg1, DdayImg2, DdayImg3, DdayImg4];

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
  const price = 250;

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
      link: "/Versailles",
      image: Versailles,
      title: "Versailles",
      price: "100€",
      p: 'The Palace of Versailles, a symbol of opulence and grandeur, is a UNESCO World Heritage site located near Paris, France. Once the royal residence of Louis XIV, it dazzles with its gilded halls, the iconic Hall of Mirrors, and sprawling, meticulously landscaped gardens.'
    },
    {
      link: "/Mont-Saint-Michel",
      image: Mont,
      title: "Mont-Saint-Michel",
      price: "180€",
      p:"Mont Saint-Michel, a breathtaking medieval abbey perched atop a rocky island, is one of France's most iconic landmarks. Surrounded by dramatic tidal waters, it seamlessly blends natural beauty with architectural grandeur, offering an unforgettable experience.",
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
    <div className="DdayWrapper">
      <div className="DdayHeader">
        <h1 className='DdayHeaderH1' data-aos-duration="1400" data-aos="fade-down" >
          All day guided tour of the D-Day landing beaches in Normandy in a small group (1-7), transport from Paris
        </h1>
        {/* <h1 className='DdayHeaderMobileH1'>
        Dday Tour from Paris (Audio guided Tour and Dday with Priority Access) with <br/>transportation (group of 7 max)
        </h1> */}
      </div>
      <div className="DdayShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="DdayImg" />
            <button className='SliderImgBtnDday Prev' onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='DdaySvg'><path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </button>
            <button className='SliderImgBtnDday Next' onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30px" width="30px" className='DdaySvg'><path fill="#ffffff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </button>
          </div>
        </div>

        <div className="DdayPaymentCard" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="1000">
          <h1 className="DdayPriceH1">{price} €/pers</h1>
          <h3 className='DdayBuyCardH3'>Chose a date :</h3>
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
              <h3 className='DdayBuyCardH3'>Available Departure Times :</h3>
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
            <p className='DdayBuyCardP'>
              You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
            </p>
          )}

          <h3 className='DdayPriceBuyCardH3'>Number Of People :</h3> 
          <div className="CountWrapper">
            <button onClick={decrement} className='DdayBtnCounter'>-</button>
            <p className='DdayCountP'>{count}</p>
            <button onClick={increment} className='DdayBtnCounter'>+</button>
          </div>
          <h3 className='DdayBuyCardH3'>Total : {price * count}€</h3>
          {selectedDate && selectedTime && (
            <p className='PaymentWarnning'>Payments are made in cash only at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='DdayBuyCardBtn' onClick={togglePopup}>Book Now</button>
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

      <div className='DdayShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="DdayMobileCarouselSlide" />
            <button className='SliderImgBtnDdayMobile PrevMobile' onClick={prevSlide}>
            {"<"}
            </button>
            <button className='SliderImgBtnDdayMobile NextMobile' onClick={nextSlide}>
              {">"}
            </button>
          </div>
        </div>
        <div className="DdayMobileCardShowAndBuyTxt">
          <p className='MobileCardTitle'>Number of  People :</p>
          <div className="CountWrapper">
            <button onClick={decrement} className='DdayBtnCounter'>-</button>
            <p className='DdayCountP'>{count}</p>
            <button onClick={increment} className='DdayBtnCounter'>+</button>
          </div>
          <p className='MobileCardP'>{price * count}€</p>
          <div className='DdayMobileDateTime'>
            <h3 className='DdayBuyCardH3'>Chose a date :</h3>
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
                <h3 className='DdayBuyCardH3'>Available Departure Times :</h3>
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
              <p className='DdayBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='DdayBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
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

        <div className='DdayDescriptionSection'>
            <h2 className='DdayDescriptionH2'>Description</h2>
            <div className="DdayDescriptionCrard">
              <ul>
                <li>Visit Omaha Beach and Juno Beach, where the Allies landed</li>
                <li>Live a moving experience as you visit the American Cemetery</li>
                <li>Luxury van Transportation, pick-up at your hotel (more than 4 pers)</li>
                <li>Service of our Normandy D-Day expert licensed guide</li>
              </ul>
            </div>
            <h2 className='DdayDescriptionTitleH2'>Join Our Small Group Tour to Normandy’s D-Day Landmarks</h2>
            <p className='DdayDescriptionP'>
            Travel from Paris with a guide-interpreter to explore the iconic sites of the Normandy
            landings, in a small group (max. 7 participants). On June 6, 1944, the Allies launched
            the largest military operation in history, opening a new front in Europe and marking the
            beginning of the end of World War II.
            Start at Pointe du Hoc, where American soldiers displayed extraordinary bravery as they
            scaled the cliffs. Then, visit Omaha Beach, where you’ll walk along the historic sands of
             D-Day. Finally, pay your respects at the American Cemetery in Colleville-sur-Mer, a solemn
              tribute to the fallen.
            </p>
        </div>


        <div className="YouMayAlsoLikeDdaySection">
          <h2 className='YouMayAlsoLikeDdayH2'>You may also like</h2>
          <div className="DdayCardWrapperYouMayAlsoLike">
            <Link to='/Bruges' className='DdayLinkCard'>
              <div className='CardsDday'>
                  <img src={Bruges} className='DdayCardImg' alt="Bruges" />
                  <h3 className='CardH3'>Bruges</h3>
                  <p className='CardDdayP'>
                    Often called the "Venice of the North", is a charming medieval city in Belgium renowned 
                    for its picturesque canals, cobblestone streets ... 
                  </p>
                  <p className='CardDdayP Price'>180€</p>
              </div>
            </Link>
            <Link to='/Versailles' className='DdayLinkCard'>
              <div className='CardsDday'>
                  <img src={Versailles} className='DdayCardImg' alt="Versailles" />
                  <h3 className='CardH3'>Versailles</h3>
                  <p className='CardDdayP'>
                  The Palace of Versailles once the royal residence of Louis XIV, a symbol of opulence and grandeur,
                   is a UNESCO World
                  Heritage site located near Paris, France.
                  </p>
                  <p className='CardDdayP Price'>115€</p>
              </div>
            </Link>
            <Link to='/Mont-Saint-Michel' className='DdayLinkCard'>
              <div className='CardsDday'>
                  <img src={Mont} className='DdayCardImg' alt="Mont" />
                  <h3 className='CardH3'>Mont-Saint-Michel</h3>
                  <p className='CardDdayP'>
                    Audio guided tour of the Mont-Saint-Michel, day trip from Paris with luxury transportation
                  </p>
                  <br />
                  <br />
                  <p className='CardDdayP Price'>180€</p>
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