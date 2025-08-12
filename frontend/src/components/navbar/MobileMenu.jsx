
const MobileMenu = ({ onLoginClick, onRegisterClick }) => {
    const links = ['Home', 'About', 'Services', 'Contact'];
  
    return (
      <div className="md:hidden px-4 pt-4 pb-6 bg-gray-790 z-50 backdrop-blur-2xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-white px-3 py-2 text-base font-medium group w-fit"
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute left-0 bottom-0 h-0.5 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
                <span className="absolute left-0 top-0 h-0.5 bg-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
              </a>
            ))}
          </div>
          <div className="flex space-x-2">
            <button onClick={onRegisterClick} className="mx-2 w-1/2 bg-white text-gray-900 px-3 py-2 rounded overflow-hidden transition-colors duration-500 hover:text-white hover:bg-gradient-to-r from-green-700 to-green-800">
              Sign Up
            </button>
            <button onClick={onLoginClick} className="mx-2 w-1/2 bg-white text-gray-900 px-3 py-2 rounded overflow-hidden transition-colors duration-500 hover:text-white hover:bg-gradient-to-r from-green-700 to-green-800">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };

export default MobileMenu;