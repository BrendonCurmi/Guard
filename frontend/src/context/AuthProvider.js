import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(localStorage.getItem("persist") === "true" || false);

    // When updating persist, update value in localStorage
    useEffect(() => {
        localStorage.setItem("persist", `${persist}`);
    }, [persist]);
    const authenticated = !!auth?.accessToken;
    return (
        <AuthContext.Provider value={{ authenticated, auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
