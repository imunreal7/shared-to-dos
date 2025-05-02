import React, { useContext, useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import TaskItem from "../components/TaskItem";
import ShareModal from "../components/ShareModal";

type Task = { id: string; title: string; description: string; created_by: string };

enum Filter {
    All,
    My,
    Shared,
}

const TasksPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [showShare, setShowShare] = useState(false);
    const [shareTaskId, setShareTaskId] = useState<string | null>(null);

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const filtered = tasks.filter((t) => {
        if (filter === Filter.My) return t.created_by === user?.uid;
        if (filter === Filter.Shared) return t.created_by !== user?.uid;
        return true;
    });

    const handleCreate = async () => {
        const title = prompt("Title");
        const description = prompt("Description") || "";
        if (title) {
            await createTask(title, description);
            loadTasks();
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            <button onClick={handleCreate}>+ New Task</button>
            <select onChange={(e) => setFilter(Number(e.target.value) as Filter)}>
                <option value={Filter.All}>All Tasks</option>
                <option value={Filter.My}>My Tasks</option>
                <option value={Filter.Shared}>Shared Tasks</option>
            </select>

            <ul>
                {filtered.map((task) => (
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
                        onShare={() => {
                            setShareTaskId(task.id);
                            setShowShare(true);
                        }}
                    />
                ))}
            </ul>

            {showShare && shareTaskId && (
                <ShareModal
                    taskId={shareTaskId}
                    onClose={() => setShowShare(false)}
                    onShared={() => {
                        setShowShare(false); /* maybe reload */
                    }}
                />
            )}
        </div>
    );
};

export default TasksPage;
