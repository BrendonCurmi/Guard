import React from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import AuthRoute from "./components/AuthRoute";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Passwords from "./pages/Passwords";
import Pins from "./pages/Pins";
import Notes from "./pages/Notes";
import Trash from "./pages/Trash";
import Generator from "./pages/Generator";
import Folder from "./pages/Folder";
import Folders from "./pages/Folders";
import Monitor from "./pages/Monitor";

import classes from "./App.module.scss";

const App = () => {
    return (
        <div className={classes.wrapper}>
            <Navigation/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route element={<AuthRoute/>}>
                        <Route path="/logout" element={<Logout/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/passwords" element={<Passwords/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/pins" element={<Pins/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/notes" element={<Notes/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/trash" element={<Trash/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/generator" element={<Generator/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/monitor" element={<Monitor/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/folders" element={<Folders/>}/>
                    </Route>
                    <Route element={<AuthRoute/>}>
                        <Route path="/folder/:name" element={<Folder/>}/>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
