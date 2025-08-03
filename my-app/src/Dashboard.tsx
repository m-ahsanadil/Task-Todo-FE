import { useState } from "react";


type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

// const API_BASE = "http://localhost:3001"; // replace with your actual backend URL


export default function Dashboard() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<string[]>([]);

    const addTask = () => {
        if (task) {
            setTasks([...tasks, task]);
            setTask("");
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">To-Do Dashboard</h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a task"
                    className="p-2 w-full border rounded"
                />
                <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {tasks.map((t, i) => (
                    <li key={i} className="bg-white p-2 rounded shadow">
                        {t}
                    </li>
                ))}
            </ul>
        </div>
    );
}
