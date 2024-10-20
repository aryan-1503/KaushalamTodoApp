import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext.jsx";
import {api} from "../api/base.js";
import Loading from "../components/Loading/Loading.jsx"; // Assuming you're using React Router

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { setTempUser } = useContext(AuthContext)

    const [loading, setLoading] = useState(false);

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
            setLoading(true)
            if(formData.confirmPassword !== formData.password){
                toast.error("Passwords doesn't match",{
                    position: "top-center"
                })
                return;
            }
            const { confirmPassword, ...data } = formData;
            const res = await api.post("/auth/register", data)
            console.log(res.data)
            setTempUser(res.data.savedUser)
            toast.success(res.data.message, {
                position: "top-right"
            })
            setTimeout(() => {
                toast.success(res.data.message, {
                    position: "top-right",
                });
            },1000)
            navigate("/verify");

        }catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message,{
                    position: "top-right"
                })
            } else {
                alert("An unexpected error occurred");
                console.log(error)
            }
            console.log(error)
        }finally {
            setLoading(false)
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Welcome to Kaushalam</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-4 border border-black rounded focus:outline-none focus:ring focus:ring-gray-800"
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-2 mb-4 border border-black rounded focus:outline-none focus:ring focus:ring-gray-800"
                    />
                    <button type="submit" className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 transition duration-300">
                        { loading ? <Loading /> : "Register"}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="hover:underline font-semibold ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
