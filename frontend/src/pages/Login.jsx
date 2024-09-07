import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = React.useState({
        username: "",
        password: "",
    })
    const [err, setErr] = React.useState(null);

    const navigate = useNavigate();

    function handleChange(e) {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await login(inputs);
            navigate("/")
        } catch (error) {
            setErr(error.response.data)
        }
    }

    return (
        <div className="flex justify-center h-screen bg-gray-300">
            <div className="w-full max-w-sm  bg-white p-8 rounded-lg shadow-md h-fit mt-32">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form>
                    <input
                        className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <input
                        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                    <button class="px-4 mt-3 w-full py-2 border flex gap-2 border-slate-300  rounded-lg text-slate-600 hover:border-slate-400  hover:text-black hover:shadow transition duration-250">
                        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                        <span>Login with Google</span>
                    </button>
                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
                    <span className="block mt-4 text-center">
                        Don't have an account?{" "}
                        <Link className="text-blue-500 hover:underline" to="/register">
                            Register
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;