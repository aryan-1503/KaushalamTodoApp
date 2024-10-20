import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {api} from "../api/base.js";
import {ToastContainer,toast} from "react-toastify";
import AuthContext from "../context/AuthContext.jsx";
import axios from "axios"; // Assuming you're using React Router

const Login = () => {
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try{
            const res = await axios.post("http://localhost:4000/api/auth/login", formData, {
                withCredentials: true
            })
            console.log(res);
            toast.success(res.data.message, {
                position: "top-right"
            })
            setUser(res.data.user);
            window.location.reload()
            navigate("/");

        }catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Welcome back!</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-4 border border-black rounded focus:outline-none focus:ring focus:ring-gray-800"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-4 border border-black rounded focus:outline-none focus:ring focus:ring-gray-800"
                    />
                    <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                        Login
                    </button>
                    <ToastContainer />
                </form>

                <p className="text-center mt-4">
                    Don't have an account?
                    <Link to="/register" className="text-black hover:underline font-semibold ml-1">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
