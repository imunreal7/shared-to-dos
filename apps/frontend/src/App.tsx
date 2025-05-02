import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";

const App: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/tasks"
                element={user ? <TasksPage /> : <Navigate to="/login" replace />}
            />
            <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
        </Routes>
    );
};

export default App;

