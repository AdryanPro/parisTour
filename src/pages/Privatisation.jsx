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

  return (
    <div className="PrivatisationWrapper">
      <div className="PrivatisationHeader">
        <h1 className='PrivatisationHeaderH1' data-aos-duration="1400" data-aos="fade-down">
        Availability of our vehicles with a driver according <br/> to your needs
        </h1>
      </div>
      <div className="PrivatisationShowAndBuy" data-aos-duration="1600" data-aos="fade-down" data-aos-delay="500">
        <div className="carrousel">
          <div className="item">
            <img src={slides[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="PrivatisationImg" />
          </div>
          <button className='SliderImgBtnPrivatisation Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnPrivatisation Next' onClick={nextSlide}>
            {">"}
          </button>
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
          <h3 className='PrivatisationBuyCardH3'>Total : {price}€</h3>
          {selectedDate && selectedTime && (
            <p className='PaymentWarnning'>Payments are made in cash only at the meeting point.</p>
          )}
          {/* <p className='PaymentWarnning'>Payment are made in cash only at the meating point</p> */}
          <button className='PrivatisationBuyCardBtn' onClick={togglePopup}>Book Now</button>
          
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

      <div className='PrivatisationShowAndBuyMobileCard'>
        <div className="carrouselMobile">
          <div className="item">
            <img src={slidesMobile[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="PrivatisationMobileCarouselSlide" />
          </div>
          <button className='SliderImgBtnPrivatisation Prev' onClick={prevSlide}>
            {"<"}
          </button>
          <button className='SliderImgBtnPrivatisation Next' onClick={nextSlide}>
            {">"}
          </button>
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
              <div>
                <h3 className='PrivatisationBuyCardH3'>Available Departure Times :</h3>
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
              <p className='PrivatisationBuyCardP'>
                You selected <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>.
              </p>
            )}
          </div>
          <button className='PrivatisationBuyCardBtnMobile' onClick={togglePopup}>Book Now</button>
                              
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

      <div className='PrivatisationDescriptionSection'>
          <h2 className='PrivatisationDescriptionH2'>Description</h2>
          <div className="PrivatisationDescriptionCrard">
            <ul>
              <li>Driver at your availability </li>
              <li>Schedule to suit your preference</li>
              <li>Luxury van Transportation mercedes class V</li>
              <li>English speaking driver</li>
            </ul>
          </div>
          <h2 className='PrivatisationDescriptionH2'>Private Van with Chauffeur</h2>
          <p className='PrivatisationDescriptionP'>
          Enjoy the luxury and comfort of our Mercedes van, complete with a professional 
          chauffeur at your service. Ideal for personalized trips or private transportation, 
          this exclusive offer provides a smooth and stress-free experience tailored to your needs. 
          Perfect for full-day excursions or special events.
          </p>
      </div>
      <div className="YouMayAlsoLikePrivatisationSection">
        <h2 className='YouMayAlsoLikePrivatisationH2'>You may also like</h2>
        <div className="PrivatisationCardWrapperYouMayAlsoLike">
          <Link to='/Versailles' className='PrivatisationLinkCard'>
            <div className='CardsPrivatisation'>
                <img src={Versailles} className='PrivatisationCardImg' alt="Versailles" />
                <p className='CardPrivatisationP'>
                L’Essentiel de Versailles Visite d’une demie- journée du chateaux de Versailles avec Acces Priotitaire
                </p>
                <p className='CardPrivatisationP Price'>115€</p>
            </div>
          </Link>
          <Link to='/Mont-Saint-Michel' className='PrivatisationLinkCard'>
            <div className='CardsPrivatisation'>
                <img src={Mont} className='PrivatisationCardImg' alt="Mont" />
                <p className='CardPrivatisationP'>
                Audio guided tour of the Mont-Saint-Michel, day trip from Paris with luxury transportation
                </p>
                <p className='CardPrivatisationP Price'>180€</p>
            </div>
          </Link>
          <Link to='/D-Day' className='BrugesLinkCard'>
            <div className='CardsBruges'>
                <img src={Dday} className='BrugesCardImg' alt="Privatisation" />
                <p className='CardBrugesP'>D-DAY</p>
                <p className='CardBrugesP Price'>250€</p>
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

