import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_s1gthb6",       // Your Service ID
        "template_6gmx0mq",      // Your Template ID
        {
          to_name: "Your Name or Brand",   // Change this if needed
          user_name: form.name,
          user_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "Jv0hcejSHWA4P2ENX"       // Your Public Key
      )
      .then(
        () => {
          setLoading(false);
          alert("Message sent successfully!");
          setForm({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error("Email send error:", error);
          alert("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Please fill out the form below.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
