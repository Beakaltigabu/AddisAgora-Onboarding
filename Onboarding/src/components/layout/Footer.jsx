import React from 'react';
import logo from '../../assets/logo.png';
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaGlobe className="w-6 h-6" />,
      url: 'https://www.agoraspeakers.org/',
      label: 'Website'
    },
    {
      icon: <FaFacebook className="w-6 h-6" />,
      url: 'https://web.facebook.com/agoraspeakers.ethiopia',
      label: 'Facebook'
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      url: 'https://www.instagram.com/addis_agora/',
      label: 'Instagram'
    },
    {
      icon: <FaTelegram className="w-6 h-6" />,
      url: 'https://t.me/AddisAgora',
      label: 'Telegram'
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/company/addisagora/',
      label: 'LinkedIn'
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollInView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src={logo}
              alt="AddisAgora Logo"
              className="h-12 mb-4"
            />
            <p className="text-white/80">Empowering Ethiopian voices worldwide</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('educational')}
                  className="hover:text-white/80 transition-colors"
                >
                  Educational Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('roles')}
                  className="hover:text-white/80 transition-colors"
                >
                  Meeting Roles
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('getting-started')}
                  className="hover:text-white/80 transition-colors"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80 hover:scale-110 transition-all"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>© {new Date().getFullYear()} AddisAgora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
