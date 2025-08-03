import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
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
                <button className="bg-blue-500 text-white w-full p-2 rounded">Register</button>
            </div>
        </div>
    );
}
