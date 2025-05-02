import React, { useContext, useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import TaskItem from "../components/TaskItem";
import ShareModal from "../components/ShareModal";

type Task = {
    id: string;
    title: string;
    description: string;
    created_by: string;
};

enum Filter {
    All = "all",
    My = "my",
    Shared = "shared",
}

const TasksPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [showShare, setShowShare] = useState(false);
    const [shareTaskId, setShareTaskId] = useState<string | null>(null);

    const loadTasks = async () => {
        const data = await fetchTasks(filter); // Pass filter to backend
        setTasks(data);
    };

    useEffect(() => {
        if (user) loadTasks();
    }, [filter, user]);

    const handleCreate = async () => {
        const title = prompt("Enter task title:");
        const description = prompt("Enter task description:") || "";
        if (title) {
            await createTask(title, description);
            loadTasks();
        }
    };

    const handleShare = (taskId: string) => {
        setShareTaskId(taskId);
        setShowShare(true);
    };

    return (
        <div>
            <h1>Tasks</h1>

            <div style={{ marginBottom: "1rem" }}>
                <button onClick={handleCreate}>+ New Task</button>

                <select
                    style={{ marginLeft: "1rem" }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as Filter)}
                >
                    <option value={Filter.All}>All Tasks</option>
                    <option value={Filter.My}>My Tasks</option>
                    <option value={Filter.Shared}>Shared Tasks</option>
                </select>
            </div>

            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={async () => {
                            await deleteTask(task.id);
                            loadTasks();
                        }}
                        onUpdate={async (t, d) => {
                            await updateTask(task.id, t, d);
                            loadTasks();
                        }}
                        onShare={() => handleShare(task.id)}
                    />
                ))}
            </ul>

            {showShare && shareTaskId && (
                <ShareModal
                    taskId={shareTaskId}
                    onClose={() => setShowShare(false)}
                    onShared={() => {
                        setShowShare(false);
                        loadTasks();
                    }}
                />
            )}
        </div>
    );
};

export default TasksPage;

