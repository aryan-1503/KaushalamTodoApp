import {Suspense, useEffect, useState} from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./layouts/RootLayout.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Verify from "./pages/Verify.jsx";
import AuthContext from "./context/AuthContext.jsx";
import axios from "axios";
import {api} from "./api/base.js";
import Loading from "./components/Loading/Loading.jsx";
import Profile from "./components/Profile.jsx";

function App() {
    const [user, setUser] = useState(null);
    const [tempUser, setTempUser] = useState(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get("/auth/me", {
                    withCredentials: true
                });
                setUser(res.data.user);
                console.log(user)
            } catch (error) {
                console.log("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading){
        return <Loading />
    }

  return (
      <AuthContext.Provider value={{ user, setUser, tempUser, setTempUser }}>
          <Router>
              <Routes>
                  <Route element={<RootLayout />}>
                      <Route path="/" element={<Home />} />
                  </Route>
                  {user ? (
                     <Route element={<RootLayout />}>
                        <Route path="/profile" element={<Profile />} />
                     </Route>
                  ) : (
                      <>
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/verify" element={<Verify />} />
                      </>
                  )}
                  <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </Router>
      </AuthContext.Provider>
  )
}

export default App
