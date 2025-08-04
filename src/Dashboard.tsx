
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  userId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

type JwtPayload = {
  id: number;
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
};

const API_BASE = "http://localhost:3001/api/v1";

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");


  const logout = () => {
    localStorage.removeItem("token"); // clear the token
    navigate("/login"); // redirect to login page
  };

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  console.log("Dashboard todos state:", todos);

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    };

    const decoded = jwtDecode<JwtPayload>(token);
    console.log("Decoded JWT:", decoded);
    if (decoded?.name) {
      setUserName(decoded.name);
    }


    fetch(`${API_BASE}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched todos:", data);
        setTodos(Array.isArray(data.data) ? data.data : []);
      })
      .catch(console.error);
  }, [navigate]);

  const addTodo = () => {
    if (!title || !description) {
      alert("Please enter both a title and description.");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    const userId = decoded.id;
    console.log("Decoded user ID:", userId);

    const newTodo = {
      title,
      description,
      isCompleted: false,
      userId: userId
    };

    console.log("Adding new todo:", newTodo);

    fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(newTodo),
    })
      .then(res => res.json())

      .then(todo => {
        const newTodos = [...todos, todo.data];
        setTodos(newTodos);
        setTitle("");
        setDescription("");
      });
  };

  const updateTodo = (id: number) => {
    fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(todos.map((t) =>
          t.id === id ? { ...t, title: editTitle, description: editDescription } : t
        ));
        setEditingTodoId(null);
      });
  };


  const toggleComplete = (id: number, isCompleted: boolean) => {
    fetch(`${API_BASE}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    }).then(() => {
      setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !isCompleted } : t));
    });
  };

  const deleteTodo = (id: number) => {
    fetch(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      setTodos(todos.filter(t => t.id !== id));
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">To-Do Dashboard</h1>

      <p className="text-gray-700 mb-4">Welcome, {userName}</p>


      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 right-0 absolute top-4 mr-6"
      >
        Logout
      </button>

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
              <div className="flex-1">
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border mb-2 rounded"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 border mb-2 rounded"
                    />
                    <div>
                      <button
                        onClick={() => updateTodo(todo.id)}
                        className="bg-purple-600 text-white px-4 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTodoId(null)}
                        className="bg-gray-400 text-white px-4 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className={`text-lg font-semibold ${todo.isCompleted ? "line-through text-gray-500" : ""}`}>
                      {todo.title}
                    </h3>
                    <p className={`text-sm ${todo.isCompleted ? "text-gray-400" : ""}`}>{todo.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Created: {new Date(todo.createdAt).toLocaleString()}</p>
                  </>
                )}
              </div>

              <div className="space-x-2 flex-shrink-0">
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
                {editingTodoId !== todo.id && (
                  <button
                    onClick={() => {
                      setEditingTodoId(todo.id);
                      setEditTitle(todo.title);
                      setEditDescription(todo.description);
                    }}
                    className="bg-blue-600 px-3 py-1 text-white rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}