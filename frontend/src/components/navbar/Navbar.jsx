// File: components/Navbar.jsx
import React, { useState } from 'react';
import Logo from './Logo';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
  
    return (
      <>
        <nav className="fixed top-0 w-full bg-gray-900 text-white shadow-md z-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Logo />
                <div className="hidden md:block">
                  <NavLinks />
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <AuthButtons
                  onLoginClick={() => setShowLogin(true)}
                  onRegisterClick={() => setShowRegister(true)}
                />
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-white hover:text-green-600 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {mobileOpen && <MobileMenu
            onLoginClick={() => { setShowLogin(true); setMobileOpen(false); }}
            onRegisterClick={() => { setShowRegister(true); setMobileOpen(false); }}
          />}
        </nav>
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </>
    );
  };


export default Navbar;