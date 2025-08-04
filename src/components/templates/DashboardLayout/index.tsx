import { FC } from "react";
import Button from "../../atoms/Button";

interface DashboardLayoutProps {
  userName: string;
  onLogout: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ userName, onLogout, children }) => (
  <div className="min-h-screen bg-gray-100 p-4">
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">To-Do Dashboard</h1>
      <div>
        <span className="mr-4 text-gray-600">Welcome, {userName}</span>
        <Button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onLogout}
          type="button"
        >
          Logout
        </Button>
      </div>
    </header>
    <div className=" p-4 rounded shadow mb-6">
      {children}
    </div>
  </div>
);
