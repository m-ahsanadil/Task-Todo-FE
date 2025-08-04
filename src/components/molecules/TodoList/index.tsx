import { FC } from "react";
import { Todo } from "../../../types/dashboard.types";
import FormField from "../FormField";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";
import { CheckCircle, Undo2, Trash2, Pencil } from "lucide-react";


interface TodoListProps {
    todos: Todo[];
    editingTodoId: number | null;
    editTitle: string;
    editDescription: string;
    onEditTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEditDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onUpdateTodo: (id: number) => void;
    onCancelEdit: () => void;
    onEditClick: (todo: Todo) => void;
    onToggleComplete: (id: number, isCompleted: boolean) => void;
    onDeleteTodo: (id: number) => void;
}

const TodoList: FC<TodoListProps> = ({
    todos,
    editingTodoId,
    editTitle,
    editDescription,
    onEditTitleChange,
    onEditDescriptionChange,
    onUpdateTodo,
    onCancelEdit,
    onEditClick,
    onToggleComplete,
    onDeleteTodo,
}) => {
    return (
        <ul className="space-y-4">
            {todos.map((todo) => (
                <li key={todo.id} className="bg-white p-4 rounded shadow">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            {editingTodoId === todo.id ? (
                                <>
                                    <FormField
                                        value={editTitle}
                                        onChange={onEditTitleChange}
                                        placeholder="Edit title"
                                        className="w-full p-2 mb-2"
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={onEditDescriptionChange}
                                        placeholder="Edit description"
                                        className="w-full p-4 mb-2 border rounded-2xl"
                                        rows={4}
                                    />
                                    <div>
                                        <Button
                                            onClick={() => onUpdateTodo(todo.id)}
                                            className="bg-purple-600 text-white px-4 py-1 rounded mr-2"
                                            type="button"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={onCancelEdit}
                                            className="bg-gray-400 text-white px-4 py-1 rounded"
                                            type="button"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Text
                                        variant="h5"
                                        weight="semibold"
                                        className={todo.isCompleted ? "line-through text-gray-500" : ""}
                                    >
                                        {todo.title}
                                    </Text>
                                    <Text
                                        variant="small"
                                        color={todo.isCompleted ? "light" : "default"}
                                    >
                                        {todo.description}
                                    </Text>
                                    <Text variant="xs" color="muted" className="mt-1">
                                        Created: {new Date(todo.createdAt).toLocaleString()}
                                    </Text>
                                </>
                            )}
                        </div>

                        <div className="space-x-2 flex-shrink-0">
                            <Button
                                onClick={() => onToggleComplete(todo.id, todo.isCompleted)}
                                className={`p-2 rounded ${todo.isCompleted ? "bg-yellow-500" : "bg-green-600"} text-white`}
                                type="button"
                            >
                                {todo.isCompleted ? <Undo2 size={18} /> : <CheckCircle size={18} />}
                            </Button>
                            <Button
                                onClick={() => onDeleteTodo(todo.id)}
                                className="bg-red-600 p-2 text-white rounded"
                                type="button"
                            >
                                <Trash2 size={18} />
                            </Button>

                            {editingTodoId !== todo.id && (
                                <Button
                                    onClick={() => onEditClick(todo)}
                                    className="bg-blue-600 p-2 text-white rounded"
                                    type="button"
                                >
                                    <Pencil size={18} />
                                </Button>
                            )}

                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
