import { createContext, useState, useEffect, useContext, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [jwtToken, setJwtToken] = useState(null);
    const [username, setUsername] = useState(null);
    const logoutTimer = useRef(null);

    // auto logout upon token expiration
    const startLogoutTimer = (token) => {
        const expTime = jwtDecode(token).exp * 1000;
        const timeout = expTime - Date.now();
        console.log(timeout) // remove this line...
        if (timeout <= 0) {
            logout();
            return;
        }
        
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(() => {
            alert("You have been automatically logged out. Please login again!");
            logout();
        }, timeout);
    }

    // on refresh check for existing token
    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
            setJwtToken(storedToken);
            setUsername(localStorage.getItem("username"));
            startLogoutTimer(storedToken);
        }

        return () => {
            if (logoutTimer.current) clearTimeout(logoutTimer.current);
        };
    }, []);

    // function called after login
    const login = (username, token) => {
        setJwtToken(token);
        setUsername(username);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('username', username);
        startLogoutTimer(token);
    };

    // function called after logout
    const logout = () => {
        setJwtToken(null);
        setUsername(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };

    return (
        <AuthContext.Provider value={{ jwtToken, username, login, logout, isLoggedIn: !!jwtToken }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
export const useAuth = () => useContext(AuthContext);