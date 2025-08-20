import { useAuth } from "../../contexts/AuthContext"; // adjust path if needed

const AuthButtons = ({ onRegisterClick, onLoginClick }) => {
  const {username, logout, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    // Logged in state
    return (
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        {/* Logged in status */}
        <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            <span className="text-white">
                Logged in as <strong>{username}</strong>
            </span>
        </div>
        <button
          onClick={logout}
          className="relative bg-red-500 text-white mx-2 px-3 py-1 rounded overflow-hidden"
        >
          Logout
        </button>
      </div>
    );
  }

  // Not logged in state
  return (
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
};







const AuthButtons_ = ({ onRegisterClick, onLoginClick }) => (
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