import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [inputs, setInputs] = React.useState({
        username: "",
        password: "",
    })
    const [file, setFile] = useState(null);
    const [err, setErr] = React.useState(null);

    const navigate = useNavigate();

    const upload = async () => {

    }

    function handleChange(e) {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const imgUrl = await upload();

        try {
            const res = await axios.post("/api/auth/register", { email: inputs.email, username: inputs.username, password: inputs.password, img: file ? imgUrl : "" });
            navigate("/login")
        } catch (error) {
            setErr(error.response.data)
        }
    }

    return (
        <div className="flex justify-center  h-screen  bg-gray-300">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md h-fit mt-32">
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
                <form>
                    {file && (
                        <img
                            className="mx-auto mb-4 w-24 h-24 rounded-full object-cover"
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                        />
                    )}
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label
                        className="block w-full text-center bg-black text-white py-2 rounded-lg cursor-pointer mb-4 hover:bg-gray-900"
                        htmlFor="file"
                    >
                        {file ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                        className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        type="text"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
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
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

                    <button class="px-4 mt-3 w-full py-2 border flex gap-2 border-slate-300  rounded-lg text-slate-600 hover:border-slate-400  hover:text-black hover:shadow transition duration-250">
                        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                        <span>Login with Google</span>
                    </button>
                    
                    <span className="block mt-3 text-center ">
                        Do you have an account?{" "}
                        <Link className="text-blue-500 hover:underline" to="/login">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>

    )
}

export default Register;