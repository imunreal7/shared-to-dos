import React from "react";

type Props = {
    task: { id: string; title: string; description: string; created_by: string };
    onDelete: () => void;
    onUpdate: (title: string, desc: string) => void;
    onShare: () => void;
};

const TaskItem: React.FC<Props> = ({ task, onDelete, onUpdate, onShare }) => {
    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button
                onClick={() =>
                    onUpdate(
                        prompt("New title", task.title) || task.title,
                        prompt("New description", task.description) || task.description,
                    )
                }
            >
                Edit
            </button>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onShare}>Share</button>
        </li>
    );
};

export default TaskItem;
