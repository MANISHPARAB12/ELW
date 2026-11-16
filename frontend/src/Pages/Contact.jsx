
import { useState } from "react";
import "../Css/Contact.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setStatus("");
    setErrorMessage("");
  };

  // Submit contact form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    try {
      const apiUrl = import.meta.env.VITE_Book_URL;

      if (!apiUrl) {
        throw new Error("API URL is missing from your .env file.");
      }

      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send your message."
        );
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
      setErrorMessage(
        error.message || "Unable to send your message. Please try again."
      );
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>

        <p className="contact-subtitle">
          Have a question? Send us a message.
        </p>

        {status === "loading" && (
          <p className="contact-info-message" role="status">
            Sending your message...
          </p>
        )}

        {status === "success" && (
          <p className="contact-success" role="status">
            Your message has been sent successfully!
          </p>
        )}

        {status === "error" && (
          <p className="contact-error" role="alert">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-field">
            <label htmlFor="contact-name">Full Name</label>

            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              autoComplete="name"
              required
              disabled={status === "loading"}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email Address</label>

            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              maxLength={254}
              autoComplete="email"
              required
              disabled={status === "loading"}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="contact-subject">Subject</label>

            <select
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={status === "loading"}
            >
              <option value="">Select a subject</option>
              <option value="General Inquiry">
                General Inquiry
              </option>
              <option value="Borrowing Books">
                Borrowing Books
              </option>
              <option value="Account Issue">
                Account Issue
              </option>
              <option value="Technical Support">
                Technical Support
              </option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>

            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              maxLength={5000}
              required
              disabled={status === "loading"}
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Sending..."
              : "Send Message →"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
