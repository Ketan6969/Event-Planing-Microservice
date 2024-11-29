import { useState } from "react";
import { validatePassword } from "../utils/Regex";
import { Link } from "react-router";

function Login() {
    const [passErr, setPassErr] = useState("");
    const [formData, setFormData] = useState({
        emailAddress: "",
        password: ""
    });

    const updateData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setPassErr(""); // Clear error on input change
    };

    const submit = (e) => {
        e.preventDefault();
        if (validatePassword(formData, setPassErr)) {
            console.log("Form Data:", formData);
        }
    };

    return (
        <div className="h-screen bg-violet-300 flex justify-center items-center gap-10">
            {/* Info Tab */}
            <div className="bg-white shadow-lg p-8 h-auto w-96 border-4 border-black rounded-xl flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-center text-violet-700">
                    Event Management & Planning
                </h1>
            </div>

            {/* Sign Up Tab */}
            <div className="bg-white shadow-lg p-8 h-auto w-96 border-4 border-black rounded-xl flex flex-col justify-start">
                <h1 className="text-xl font-bold text-violet-700 mb-4">
                    Login
                </h1>
                <form
                    action="#"
                    className="flex flex-col gap-4"
                    onSubmit={submit}
                >
                    {/* Form Inputs */}
                    
                    <input
                        type="email"
                        name="emailAddress"
                        placeholder="Email Address"
                        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-violet-300"
                        value={formData.emailAddress}
                        onChange={updateData}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-violet-300"
                        value={formData.password}
                        onChange={updateData}
                        required
                    />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-violet-700 text-white font-bold py-2 px-4 rounded-md hover:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300"
                    >
                        Log In
                    </button>
                    
                    <h3 className="text-gray-700 text-sm">Don't have an account?</h3>
                    <Link
                        to="/signup"
                        className="text-violet-700 text-sm font-bold hover:underline focus:outline-none focus:ring focus:ring-violet-300"
                    >
                        Sign Up
                    </Link>

                    {passErr && <p style={{ color: "red" }}>{passErr}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
