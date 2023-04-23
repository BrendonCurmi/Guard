import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import { useAuth } from "./context/AuthProvider";

const App = () => {
    const { auth } = useAuth();
    return (
        <div>
            <Navigation auth={auth} email/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
