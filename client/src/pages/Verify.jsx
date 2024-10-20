import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading.jsx";
import AuthContext from "../context/AuthContext.jsx";
import { api } from "../api/base.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { tempUser, setUser } = useContext(AuthContext);

    console.log("TEMP USER : ", tempUser);

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("/auth/verify", { email: tempUser.email, verificationCode });
            toast.success(res.data.message, {
                position: "top-right",
            });
            setUser(res.data.user);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: "top-center"
                });
                if (error.response.data.message === "Verification Failed") {
                    navigate("/");
                }
            } else {
                const response = await api.delete(`/auth/delete-user/${tempUser._id}`);
                toast.error(`An unexpected error occurred. ${response.data.message}`, {
                    position: "top-center"
                });
                console.log(error);
            }
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-8 flex flex-col justify-center items-center w-[90%] sm:w-[400px] h-auto rounded-lg shadow-lg bg-white">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Verify Your Email</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
                    <input
                        type="text"
                        name="verificationCode"
                        placeholder="Enter Verification Code"
                        onChange={handleChange}
                        required
                        className="h-[2.5rem] w-full rounded-lg border-2 border-gray-300 focus:border-amber-500 focus:outline-none px-4"
                    />
                    <button
                        type="submit"
                        className="w-full h-[2.5rem] rounded-lg bg-black text-white font-bold text-lg transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
                    >
                        {loading ? <Loading /> : "Verify"}
                    </button>
                </form>
                <div className="mt-3 text-gray-700 text-center">
                    <p className="text-lg">Didn't receive a code?
                        <Link to="/resend-code" className="pl-1 font-semibold">Resend</Link>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Verify;
