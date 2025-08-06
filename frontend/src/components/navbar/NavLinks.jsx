// File: components/NavLinks.jsx
import React from 'react';

const links = ['Home', 'About', 'Services', 'Contact'];

const NavLinks = () => (
    <div className="ml-10 flex items-baseline space-x-4">
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          className="relative text-white px-3 py-2 text-sm font-medium group w-fit"
        >
          <span className="relative z-10">{link}</span>
          <span className="absolute left-0 bottom-0 h-0.5 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
          <span className="absolute left-0 top-0 h-0.5 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
        </a>
      ))}
    </div>
  );

export default NavLinks;
