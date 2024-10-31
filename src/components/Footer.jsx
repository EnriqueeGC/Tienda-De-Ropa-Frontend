import React from 'react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Conócenos</h3>
          <p>Somos Pequeña Wear, una marca comprometida con el estilo y la comodidad en el mundo deportivo.</p>
          <p>Nuestra misión es ofrecer ropa de alta calidad para cada uno de tus entrenamientos.</p>
        </div>
        <div className="footer-column">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/peque_nawear/?hl=es" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@pequenawear_oficial?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Ayuda y contacto</h3>
          <p>Para consultas, contáctanos:</p>
          <p>Email: <a href="mailto:contacto@pequeñawear.com">contacto@pequeñawear.com</a></p>
          <p>Tel: +1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Pequeña Wear. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

