import { useAuth } from "../../contexts/AuthContext";
import { useState } from 'react';


const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    // ensure fields are not empty
    if (!username || !password) {
      setMessage("Input fields must not be left empty");
      return;
    }

    // send request to server
    
  }

};


const LoginModal_ = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setMessage('Fields cannot be empty');
      return;
    }
    // Simulate login logic
    if (username === 'user' && password === 'pass') {
      setMessage(`Success! You are logged in as ${username}`);
      // Store JWT (simulated)
      localStorage.setItem('token', 'fake-jwt-token');
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-gray-900 text-white p-8 rounded shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl leading-none focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded transition-colors"
          >
            Login
          </button>
          {message && <p className="text-center mt-2 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
