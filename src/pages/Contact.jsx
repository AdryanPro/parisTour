import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../css/ContactComponent.css"; // Link to the CSS file

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.message.trim()) validationErrors.message = "Message is required";
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

    const serviceId = "service_e2eqntv"; // Replace with your EmailJS service ID
    const templateId = "template_3oidqlb"; // Replace with your EmailJS template ID
    const publicKey = "Tp1BEybTug-UIAbgG"; // Replace with your EmailJS public key

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Email sent successfully:", result);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending your message. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Us</h2>
      {isSubmitted && (
        <p className="success-message">
          Thank you for your message! We will get back to you soon.
        </p>
      )}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? "input-error" : ""}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
    </div>
  );
}
