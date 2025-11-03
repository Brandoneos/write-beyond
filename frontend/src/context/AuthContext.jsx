// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null = not logged in
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (err) {
                localStorage.removeItem("user");
            }
        }
    }, []);
    const login = async (username, password) => {
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                const userData = { id: data.id, username: data.username };
                setUser(userData); 
                localStorage.setItem("user", JSON.stringify(userData)); // ← SAVE
                return data;
            } else {
                throw new Error(data.error || "Login failed");
            }
        } catch (err) {
            throw err;
        }
    };

    const logout = () =>  {
        setUser(null);
        localStorage.removeItem("user"); // ← CLEAR
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);