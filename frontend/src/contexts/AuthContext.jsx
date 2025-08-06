import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [jwtToken, setJwtToken] = useState(null);
    const [username, setUsername] = useState(null);

    // on refresh check for existing token
    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
            setJwtToken(storedToken);
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    // function called after login
    const login = (username, token) => {
        setJwtToken(token);
        setUsername(username);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('username', username);
    };

    // function called after logout
    const logout = () => {
        setJwtToken(null);
        setUsername(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ jwtToken, username, login, logout, isLoggedIn: !!jwtToken }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
export const useAuth = () => useContext(AuthContext);