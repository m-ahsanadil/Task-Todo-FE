
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../lib/constants";
import { TODO_ENDPOINTS } from "../../lib/endpoints";
import { TodosResponse, TodoResponse, Todo } from "../../types/dashboard.types";
import { getToken } from "../../utils/auth";
import { decodeToken } from "../../utils/decodeToken";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { removeLocalStorage } from "../../utils/localStorageHelper";
import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { TodoForm } from "../../components/organisms/TodoForm";
import TodoList from "../../components/molecules/TodoList";
import { useToast } from "../../lib/toast-context";

export const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const token = getToken();
  const { showToast } = useToast();


  const logout = () => {
    removeLocalStorage(STORAGE_KEYS.TODO_TOKEN);
    showToast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      type: "success"
    });
    navigate("/");
  };

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      removeLocalStorage(STORAGE_KEYS.TODO_TOKEN);
      navigate("/");
      return;
    }

    const decoded = decodeToken(token);

    if (decoded?.name) {
      setUserName(decoded.name);
    }

    fetch(TODO_ENDPOINTS.TODOS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((data: TodosResponse) => {
        setTodos(Array.isArray(data.data) ? data.data : []);
      })
      .catch(console.error);
  }, [navigate, token]);


  const addTodo = () => {
    if (!title || !description) {
      showToast({
        title: "Missing Fields",
        description: "Please fill out missing fields.",
        type: "error"
      });
      return;
    }

    if (!token || isTokenExpired(token)) {
      showToast({
        title: "Session Expired",
        description: "Please login again.",
        type: "error"
      });
      logout();
      return;
    }

    const decoded = decodeToken(token);
    if (!decoded) {
      showToast({
        title: "Invalid Token",
        description: "Please login again.",
        type: "error"
      });
      return;
    }

    const userId = decoded.id;

    const newTodo = {
      title,
      description,
      isCompleted: false,
      userId: userId
    };

    fetch(TODO_ENDPOINTS.TODOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then(res => res.json())
      .then((todo: TodoResponse) => {
        const newTodos = [...todos, todo.data];
        setTodos(newTodos);
        setTitle("");
        setDescription("");
        showToast({
          title: "Success!",
          description: "Todo added successfully.",
          type: "success"
        });
      })
      .catch(error => {
        console.error("Error adding todo:", error);
        showToast({
          title: "Error",
          description: "Failed to add todo. Please try again.",
          type: "error"
        });
      });
  };

  const updateTodo = (id: number) => {
    if (!token || isTokenExpired(token)) {
      showToast({
        title: "Session Expired",
        description: "Please login again.",
        type: "error"
      });
      logout();
      return;
    }

    fetch(TODO_ENDPOINTS.TODO_BY_ID(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        showToast({
          title: "Success!",
          description: "Todo updated successfully.",
          type: "success"
        });
      })
      .catch(error => {
        console.error("Error updating todo:", error);
        showToast({
          title: "Error",
          description: "Failed to update todo. Please try again.",
          type: "error"
        });
      });
  };

  const toggleComplete = (id: number, isCompleted: boolean) => {
    if (!token || isTokenExpired(token)) {
      showToast({
        title: "Session Expired",
        description: "Please login again.",
        type: "error"
      });
      logout();
      return;
    }

    fetch(TODO_ENDPOINTS.TODO_BY_ID(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    })
      .then(() => {
        setTodos(todos.map(t => t.id === id ? { ...t, isCompleted: !isCompleted } : t));
        showToast({
          title: "Success!",
          description: `Todo marked as ${!isCompleted ? 'completed' : 'incomplete'}.`,
          type: "success"
        });
      })
      .catch(error => {
        console.error("Error toggling todo:", error);
        showToast({
          title: "Error",
          description: "Failed to update todo status. Please try again.",
          type: "error"
        });
      });
  };

  const deleteTodo = (id: number) => {
    fetch(TODO_ENDPOINTS.TODO_BY_ID(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
        showToast({
          title: "Success!",
          description: "Todo deleted successfully.",
          type: "success"
        });
      })
      .catch(error => {
        console.error("Error deleting todo:", error);
        showToast({
          title: "Error",
          description: "Failed to delete todo. Please try again.",
          type: "error"
        });
      });
  };

  return (
    <DashboardLayout userName={userName} onLogout={logout}>
      <div className="flex flex-col p-4">
        <TodoForm
          title={title}
          description={description}
          onTitleChange={(e) => setTitle(e.target.value)}
          onDescriptionChange={(e) => setDescription(e.target.value)}
          onSubmit={addTodo}
        />

        <TodoList
          todos={todos}
          editingTodoId={editingTodoId}
          editTitle={editTitle}
          editDescription={editDescription}
          onEditTitleChange={(e) => setEditTitle(e.target.value)}
          onEditDescriptionChange={(e) => setEditDescription(e.target.value)}
          onUpdateTodo={updateTodo}
          onCancelEdit={() => setEditingTodoId(null)}
          onEditClick={(todo) => {
            setEditingTodoId(todo.id);
            setEditTitle(todo.title);
            setEditDescription(todo.description);
          }}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
        />

      </div>
    </DashboardLayout>
  );
}