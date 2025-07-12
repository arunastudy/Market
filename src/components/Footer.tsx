import React from 'react';
import {
  FaTelegramPlane, FaYoutube, FaWhatsapp, FaInstagram,
  FaPhone, FaMapMarkerAlt, FaClock
} from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white pt-12 pb-8 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column */}
        <div>
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            KelKel
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-xl text-blue-400 mt-1 mr-4" />
              <div>
                <p className="font-semibold">Адрес:</p>
                <p className="text-gray-300">г. Каракол, ул. Токтогула 242, магазин "Кел Кел"</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaPhone className="text-xl text-blue-400 mr-4" />
              <div>
                <p className="font-semibold">Контакты:</p>
                <a href="tel:+996505590590" className="text-gray-300 hover:text-white">0505 590 590</a>
              </div>
            </div>

            <div className="flex items-center">
              <FaWhatsapp className="text-xl text-green-400 mr-4" />
              <div>
                <p className="font-semibold">WhatsApp:</p>
                <a
                  href="https://wa.me/996505590590"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  0505 590 590
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <FaClock className="text-xl text-blue-400 mr-4" />
              <div>
                <p className="font-semibold">График работы:</p>
                <p className="text-gray-300">9:00 - 19:00 (ежедневно)</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-bold mb-4">Мы в соцсетях:</h4>
            <div className="flex space-x-4">
              <a
                href="https://t.me/kelkel_kg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/996505590590"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://instagram.com/kelkel.karakol"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Map */}
<div className="rounded-lg overflow-hidden shadow-2xl h-80 md:h-full">
  <iframe
    src="https://widgets.2gis.com/widget?type=map&options={%22center%22:{%22lat%22:42.486944,%22lon%22:78.395833},%22zoom%22:18,%22marker%22:{%22lat%22:42.486944,%22lon%22:78.395833}}"
    width="100%"
    height="100%"
    frameBorder="0"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    title="Карта 2GIS"
  ></iframe>
</div>

      </div>

      <div className="text-center text-gray-400 mt-12 text-sm">
        &copy; {new Date().getFullYear()} KelKel. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;
