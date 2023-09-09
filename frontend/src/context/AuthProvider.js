import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const authenticated = !!auth?.accessToken;
    return (
        <AuthContext.Provider value={{ authenticated, auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
