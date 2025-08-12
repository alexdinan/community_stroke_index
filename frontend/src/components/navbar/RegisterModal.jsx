
import { useState } from 'react';


const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  const handleSignUp = async () => {
    // ensure non-empty fields
    if (!username || !password || !confirmPassword) {
      setMessage("Input fields must not be left empty");
      return;
    }

    // ensure passwords match
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // send request to server
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      // handle unsuccessful attempts
      if (!response.ok) {
        setMessage(data.error || "Sign up failed");
        return;
      }

      // success
      setMessage("Success! Please login now");

    } catch (err) {
      // log error
      console.error(`Login failed: ${err}`);
      setMessage("Server failed. Please try again later");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Top Header Section */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-6 py-3 relative flex justify-center items-center mb-6">
          <h2 className="text-xl font-semibold">Sign Up</h2>
          <span
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl hover:text-gray-200 cursor-pointer"
          >
            ×
          </span>
        </div>
  
        {/* Body Section */}
        <div className="p-6 flex flex-col gap-4 mt-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
  
          {/* Sign Up Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSignUp}
              className="custom-login-btn !bg-blue-600 hover:!bg-blue-700 text-white font-medium !rounded-full transition-colors w-[12ch] py-2 text-center"
            >
              Sign Up
            </button>
          </div>
  
          {/* Message */}
          {message && (
            <div
              className={`mt-2 text-center text-sm ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};


export default RegisterModal;