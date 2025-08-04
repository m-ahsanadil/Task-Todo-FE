import { FC } from "react";
import Button from "../../atoms/Button";
import FormField from "../../molecules/FormField";

interface TodoFormProps {
  title: string;
  description: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export const TodoForm: FC<TodoFormProps> = ({ title, description, onTitleChange, onDescriptionChange, onSubmit }) => (
  <div className="bg-white p-4 rounded shadow w-full mb-6">
    <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
    <FormField
      value={title}
      onChange={onTitleChange}
      placeholder="Title"
      className="w-full p-2 mb-2"
    />
    <textarea
      value={description}
      onChange={onDescriptionChange}
      placeholder="Description"
      className="w-full p-4 mb-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
      rows={3}
    />
    <Button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded" type={"button"}>
      Add Todo
    </Button>
  </div>
);
