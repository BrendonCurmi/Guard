import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import { useAuth } from "./context/AuthProvider";

import classes from "./App.module.scss";

const App = () => {
    const { auth } = useAuth();
    return (
        <div className={classes.wrapper}>
            <Navigation auth={auth} email/>
            <main className={classes.content}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
