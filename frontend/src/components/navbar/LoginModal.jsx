import { useAuth } from "../../contexts/AuthContext";
import { useState } from 'react';


const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    // ensure fields are not empty
    if (!username || !password) {
      setMessage("Input fields must not be left empty");
      return;
    }

    try {
      // send request to server
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      // handle unsuccessful attempts
      if (!response.ok) {
        setMessage(data.error || "Login failed");
        return;
      }
      
      // success
      login(username, data.token);
      setMessage(`Success! Logged in as ${username}`);

    } catch (err) {
      // log error
      console.error(`Login failed: ${err}`);
      setMessage("Server failed. Please try again later");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-[20vh] z-50">
      <div className="bg-gray-900 text-red p-15 rounded shadow-lg w-full max-w-lg relative">
        <h1 className="text-white text-9xl text-center mb-8">Login</h1>
        <div className="pt-8 mt-8 space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3 w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 w-full px-4 py-3 rounded bg-white text-black focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-black hover:bg-green-800 text-white px-4 py-3 rounded transition-colors"
          >
            Login
          </button>
          {message && <p className="text-white text-center mt-2 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
