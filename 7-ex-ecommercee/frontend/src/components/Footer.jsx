import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Column 1: About */}
          <div className="footer-section">
            <h3 className="footer-title">Reset Shop</h3>
            <p className="footer-description">
              Your trusted destination for quality products. Shop with
              confidence and enjoy the best deals.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="footer-link">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <p className="footer-contact-item">
                <span className="footer-icon">📧</span>
                support@resetshop.com
              </p>
              <p className="footer-contact-item">
                <span className="footer-icon">📞</span>
                +62 812 3456 7890
              </p>
              <p className="footer-contact-item">
                <span className="footer-icon">📍</span>
                Jakarta, Indonesia
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Reset Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
