// import { useState } from "react";


// type Todo = {
//   id: number;
//   userId: number;
//   title: string;
//   description: string;
//   isCompleted: boolean;
//   createdAt: string;
// };

// // const API_BASE = "http://localhost:3001"; 


// export default function Dashboard() {
//     const [task, setTask] = useState("");
//     const [tasks, setTasks] = useState<string[]>([]);

//     const addTask = () => {
//         if (task) {
//             setTasks([...tasks, task]);
//             setTask("");
//         }
//     };

//     return (
//         <div className="min-h-screen p-8 bg-gray-100">
//             <h1 className="text-3xl font-bold mb-4">To-Do Dashboard</h1>
//             <div className="flex gap-2 mb-4">
//                 <input
//                     type="text"
//                     value={task}
//                     onChange={(e) => setTask(e.target.value)}
//                     placeholder="Enter a task"
//                     className="p-2 w-full border rounded"
//                 />
//                 <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded">
//                     Add
//                 </button>
//             </div>
//             <ul className="space-y-2">
//                 {tasks.map((t, i) => (
//                     <li key={i} className="bg-white p-2 rounded shadow">
//                         {t}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

const API_BASE = "http://localhost:3000/api/v1/todos"; // replace with your actual backend URL

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(console.error);
  }, []);

  const addTodo = () => {
    if (!title || !description) return;

    const newTodo = {
      title,
      description,
      isCompleted: false,
      userId: 1, // replace with actual userId from auth
    };

    fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then(res => res.json())
      .then(todo => {
        setTodos([...todos, todo]);
        setTitle("");
        setDescription("");
      });
  };

  const toggleComplete = (id: number, isCompleted: boolean) => {
    fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    }).then(() => {
      setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !isCompleted } : t));
    });
  };

  const deleteTodo = (id: number) => {
    fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter(t => t.id !== id));
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">To-Do Dashboard</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl mb-2">Add New Task</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border mb-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border mb-2 rounded"
        />
        <button onClick={addTodo} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Todo
        </button>
      </div>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`text-lg font-semibold ${todo.isCompleted ? "line-through text-gray-500" : ""}`}>
                  {todo.title}
                </h3>
                <p className={`text-sm ${todo.isCompleted ? "text-gray-400" : ""}`}>{todo.description}</p>
                <p className="text-xs text-gray-400 mt-1">Created: {new Date(todo.createdAt).toLocaleString()}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => toggleComplete(todo.id, todo.isCompleted)}
                  className={`px-3 py-1 rounded ${todo.isCompleted ? "bg-yellow-500" : "bg-green-600"} text-white`}
                >
                  {todo.isCompleted ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-600 px-3 py-1 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
