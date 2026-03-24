import { useForm } from "react-hook-form";

export default function Contact() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              <strong>Name:</strong>Panjul
            </p>
            <p>
              <strong>Email:</strong>panjul@gmail.com
            </p>
            <p>
              <strong>Phone:</strong>+62 896-1241-4182
            </p>
            <p>
              <strong>Address:</strong>Padang, Indonesia
            </p>
          </div>
          <div className="contact-form">
            <h3>Send Message</h3>
            {/* Form */}
          </div>
        </div>
      </div>
    </div>
  );
}
