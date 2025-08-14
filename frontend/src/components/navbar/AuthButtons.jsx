
const AuthButtons = ({ onRegisterClick, onLoginClick }) => (
    <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
      <button
        onClick={onRegisterClick}
        className="relative bg-white text-black mx-2 px-3 py-1 rounded overflow-hidden"
      >
        Sign Up
      </button>
      <button
        onClick={onLoginClick}
        className="relative bg-white text-black mx-1 px-3 py-1 rounded overflow-hidden"
      >
        Login
      </button>
    </div>
  );

export default AuthButtons;