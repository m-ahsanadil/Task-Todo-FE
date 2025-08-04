import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    console.log("Register form state:", form);

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setError("All fields are required.");
            return;
        }

        try {
            await axios.post("http://localhost:3001/api/v1/register", form);
            alert("Registered successfully!");
            setForm({ name: "", email: "", password: "" });
            navigate("/login");
        } catch (err: any) {

            setError("Failed to register. Try again.");

        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded mb-2"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-2"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-2"
                    onChange={handleChange}
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    className="bg-blue-500 text-white w-full p-2 rounded"
                    onClick={handleSubmit}
                >
                    Register
                </button>
                <p className="text-sm mt-3 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login here
                    </span>
                </p>
            </div>

        </div>
    );
}
