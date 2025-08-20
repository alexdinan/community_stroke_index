import { useAuth } from "../../contexts/AuthContext"; // adjust path if needed

const MobileMenu = ({ onLoginClick, onRegisterClick }) => {
  const {username, logout, isLoggedIn } = useAuth();
  const links = ["Home", "About", "Services", "Contact"];

  return (
    <div className="md:hidden px-4 pt-4 pb-6 bg-gray-790 z-50 backdrop-blur-2xl">
      <div className="flex flex-col space-y-4">
        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative text-white px-3 py-2 text-base font-medium group w-fit"
            >
              <span className="relative z-10">{link}</span>
              <span
                className="absolute left-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ width: "100%" }}
              />
              <span
                className="absolute left-0 top-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ width: "100%" }}
              />
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <div className="flex flex-col space-y-2 items-center">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white px-3 py-2 rounded overflow-hidden"
            >
              Logout
            </button>
            <div className="flex items-center space-x-2 mt-3">
              {/* Green circle indicator */}
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
              {/* Username text */}
              <span className="text-white text-center italic">
                Logged in as: <strong>{username}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={onRegisterClick}
              className="mx-2 w-1/2 bg-white text-black px-3 py-2 rounded overflow-hidden"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              className="mx-2 w-1/2 bg-white text-black px-3 py-2 rounded overflow-hidden"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};




const MobileMenu_ = ({ onLoginClick, onRegisterClick }) => {
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
                <span className="absolute left-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
                <span className="absolute left-0 top-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ width: '100%' }} />
              </a>
            ))}
          </div>
          <div className="flex space-x-2">
            <button onClick={onRegisterClick} className="mx-2 w-1/2 bg-white text-black px-3 py-2 rounded overflow-hidden">
              Sign Up
            </button>
            <button onClick={onLoginClick} className="mx-2 w-1/2 bg-white text-black px-3 py-2 rounded overflow-hidden">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };

export default MobileMenu;