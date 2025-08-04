// import { useState } from "react";

// export default function Login() {
//     const [form, setForm] = useState({ email: "", password: "" });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-6 rounded shadow-md w-80">
//                 <h2 className="text-2xl font-bold mb-4">Login</h2>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="w-full p-2 border rounded mb-2"
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full p-2 border rounded mb-2"
//                     onChange={handleChange}
//                 />
//                 <button className="bg-green-500 text-white w-full p-2 rounded">Login</button>
//             </div>
//         </div>
//     );
// }

// Login.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            setError("Both fields are required.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/api/v1/login", form);
            localStorage.setItem("token", res.data.token); // JWT store
            setForm({ email: "", password: "" });
            alert("Login successful!");
            navigate("/dashboard");
        } catch {
            setError("Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                    className="bg-green-500 text-white w-full p-2 rounded"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
