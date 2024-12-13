import { useState } from "react";
import { validateForm } from "../utils/Regex";
import { Link } from "react-router";

function SignUp() {
    const [passErr, setPassErr] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const sendReq = async (formData) => {
        const url = `http://127.0.0.1:5000/register?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`;
        //Code to send the API Fetch request
        try{
            const response = await fetch(url, {method : 'POST'})
            if (!response.ok){
                throw new Error(`Response status: {$response.status} `)
            }
            const data = await response.json()
            return data
        } 
        catch(error) {
            console.error
        }
        console.log("Sending Request with:", formData);
    }

    const updateData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setPassErr(""); // Clear error on input change
    };

    const submit = (e) => {
        e.preventDefault();
        if (validateForm(formData, setPassErr)) {
            console.log("Form Data:", formData);
            const response = sendReq(formData)
            
        }
    };

    return (
        <div className="h-screen bg-violet-300 flex justify-center items-center gap-10">
            {/* Info Tab */}
            <div className="bg-white shadow-lg p-8 h-3/4 w-96 border-4 border-black rounded-xl flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-center text-violet-700">
                    Event Management & Planning
                </h1>
            </div>

            {/* Sign Up Tab */}
            <div className="bg-white shadow-lg p-8 h-auto w-96 border-4 border-black rounded-xl flex flex-col justify-start">
                <h1 className="text-xl font-bold text-violet-700 mb-4">
                    Create an Account
                </h1>
                <form
                    action="#"
                    className="flex flex-col gap-4"
                    onSubmit={submit}
                >
                    {/* Form Inputs */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-violet-300"
                        value={formData.name}
                        onChange={updateData}
                        required
                    />
                    <input
                        type="email"
                        name="email"
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
                    <input
                        type="password"
                        name="rePassword"
                        placeholder="Confirm Password"
                        className="border-2 border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-violet-300"
                        value={formData.rePassword}
                        onChange={updateData}
                        required
                    />
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-violet-700 text-white font-bold py-2 px-4 rounded-md hover:bg-violet-800 focus:outline-none focus:ring focus:ring-violet-300"
                    >
                        Sign Up
                    </button>
                    
                    <h3 className="text-gray-700 text-sm">Already have an account?</h3>
                    <Link
                        to="/login"
                        className="text-violet-700 text-sm font-bold hover:underline focus:outline-none focus:ring focus:ring-violet-300"
                    >
                        Login
                    </Link>

                    {passErr && <p style={{ color: "red" }}>{passErr}</p>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;
