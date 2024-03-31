import { Toaster } from "sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../../styles/global.css";
import { UserProvider } from "../../hooks/useUser.jsx";

import Home from "../../../pages/home/Home.jsx";
import Login from "../../../pages/login/Login.jsx";
import Recover from "../../../pages/recover/Recover.jsx";
import Token from "../../../pages/recover/token/Token.jsx";
import Register from "../../../pages/register/Register.jsx";

export default function Layout() {
    return (
        <>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route
                            path={"/"}
                            element={
                                <div className="h-[100vh] flex">
                                    <Home />
                                </div>
                            }
                        />

                        <Route
                            path={"/login"}
                            element={
                                <div className="h-[100vh] flex">
                                    <Login />
                                </div>
                            }
                        />

                        <Route
                            path={"/register"}
                            element={
                                <div className="h-[100vh] flex">
                                    <Register />
                                </div>
                            }
                        />

                        <Route
                            path={"/recover"}
                            element={
                                <div className="h-[100vh] flex">
                                    <Recover />
                                </div>
                            }
                        />

                        <Route
                            path={"/recover/:token"}
                            element={
                                <div className="h-[100vh] flex">
                                    <Token />
                                </div>
                            }
                        />
                    </Routes>
                </Router>
            </UserProvider>

            <Toaster />
        </>
    );
}
