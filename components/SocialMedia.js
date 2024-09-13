import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, XSquare } from 'lucide-react';

const socialMediaLinks = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/yourcompany' },
  { name: 'Twitter', icon: XSquare, url: 'https://x.com/yourcompany' },
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/yourcompany' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/yourcompany' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/yourcompany' },
];

const SocialMediaLinks = () => {
  return (
    <div className="flex justify-center items-center space-x-4 py-4">
      {socialMediaLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
          aria-label={`Follow us on ${social.name}`}
        >
          <social.icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;