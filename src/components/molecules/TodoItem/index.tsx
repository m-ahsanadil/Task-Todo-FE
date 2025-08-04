import { FC } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onSave: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, isEditing, onEdit, onSave, onDelete, onComplete, onCancel }) => {
  return (
    <li className="bg-white p-4 rounded shadow">
      {isEditing ? (
        <>
          {/* editable fields */}
        </>
      ) : (
        <>
          <h3 className={`text-lg font-semibold ${todo.isCompleted ? "line-through" : ""}`}>
            {todo.title}
          </h3>
          <p className="text-sm text-gray-600">{todo.description}</p>
        </>
      )}
      {/* buttons: edit, save, delete, complete */}
    </li>
  );
};
