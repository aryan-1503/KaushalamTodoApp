import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {FaRegUser} from "react-icons/fa";
import AuthContext from "../context/AuthContext.jsx";
import { api } from "../api/base.js"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {user,setUser} = useContext(AuthContext);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.menu-content') && !event.target.closest('.hamburger-button')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = async () => {
        try{
            const res = await api.post("/auth/logout",{})
            if (res.status === 200) {
                toast.success(res.data.message, {
                    position: "top-center",
                });
                setUser(null);
            }
            window.location.reload();
        }catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
            <ToastContainer />
            <header className="w-screen flex justify-around items-center gap-[15rem] p-2 border rounded-b-2xl border-b-gray-100 border-b-lg shadow-2xl mxs:gap-7">
                <Link to="/" className="flex justify-center font-bold items-center gap-3 tracking-wide text-[30px]">
                    Kaushalam
                </Link>
                <nav className="flex gap-5 text-[19px] flex-wrap tracking-wider items-center mxs:hidden msm:hidden">
                    {
                        user ? (
                            <>
                                <Link to="/profile" className="flex justify-center items-center gap-1 hover:underline active:scale-95"><FaRegUser className="text-[16px]" />Profile</Link>
                                <Link to="/" className="hover:underline active:scale-95" onClick={handleLogout}>Logout</Link>
                            </>

                        ) : (
                            <>
                                <Link to="/register" className="bg-black text-white rounded-md text-lg p-2 hover:bg-gray-800 hover:transition ease-in delay-150 hover:shadow-2xl active:scale-95">SignUp</Link>
                                <Link to="/login" className="hover:underline active:scale-95">Login</Link>
                            </>

                        )
                    }

                </nav>
                <button className="flex active:scale-95 md:hidden hamburger-button" onClick={() => setIsOpen(!isOpen)}>
                    <GiHamburgerMenu className="text-3xl" />
                </button>
            </header>
            {isOpen &&
                <div className="flex justify-end m-2 absolute right-5 animate-expand-vertically">
                    <div className="p-4 flex justify-center items-center text-[24px] flex-col bg-[#f6f0d8] shadow-2xl border-2 border-amber-950 md:hidden">

                        {
                            user ? (
                                <>
                                    <Link to="/profile" className="w-full border-b-2 border-b-amber-950 font-[500]">Profile</Link>
                                    <Link to="/" className="w-full font-[500] font-[Dubai,serif]" onClick={handleLogout}>Logout</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/register" className="w-full border-b-2 border-b-black font-[500]">SignUp</Link>
                                    <Link to="/login" className="w-full font-[500] font-[Dubai,serif]">Login</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default Navbar;
