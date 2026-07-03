import { useState } from "react";
import { submitContact } from "../services/contact.service";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactForm() {
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState([]);

  const [serverMessage, setServerMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error of current field while typing
    setErrors((prev) => prev.filter((error) => error.field !== name));

    setServerMessage("");
  };

  const getFieldError = (fieldName) => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrors([]);
    setSuccess(false);
    setServerMessage("");

    try {
      const response = await submitContact(formData);

      setSuccess(true);

      setServerMessage(response.message);

      setFormData(initialForm);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      }

      setServerMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-card">
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />

      <h2>
        Send a Message <span className="brush-mark">結</span>
      </h2>

      <p className="form-description">
        Fill out the form below and your words will reach us across the
        divide.
      </p>

      {serverMessage && (
        <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />

          {getFieldError("name") && (
            <small className="error-text">{getFieldError("name")}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          {getFieldError("email") && (
            <small className="error-text">{getFieldError("email")}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>

          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Need assistance"
            value={formData.subject}
            onChange={handleChange}
          />

          {getFieldError("subject") && (
            <small className="error-text">{getFieldError("subject")}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />

          {getFieldError("message") && (
            <small className="error-text">{getFieldError("message")}</small>
          )}
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          <span>{loading ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
