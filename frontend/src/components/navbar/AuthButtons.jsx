
const AuthButtons = ({ onRegisterClick, onLoginClick }) => (
    <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
      <button
        onClick={onRegisterClick}
        className="relative bg-white text-gray-900 mx-2 px-3 py-1 rounded overflow-hidden transition-colors duration-500 hover:text-white hover:bg-gradient-to-r from-green-700 to-green-800"
      >
        Sign Up
      </button>
      <button
        onClick={onLoginClick}
        className="relative bg-white text-gray-900 px-3 py-1 rounded overflow-hidden transition-colors duration-500 hover:text-white hover:bg-gradient-to-r from-green-700 to-green-800"
      >
        Login
      </button>
    </div>
  );

export default AuthButtons;