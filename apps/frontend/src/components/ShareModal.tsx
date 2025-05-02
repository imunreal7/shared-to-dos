import React, { useState, useEffect } from "react";
import { fetchUsers, shareTask } from "../api/api";

type Props = {
    taskId: string;
    onClose: () => void;
    onShared: () => void;
};

type User = { id: string; email: string };

const ShareModal: React.FC<Props> = ({ taskId, onClose, onShared }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetchUsers();
                if (Array.isArray(result)) {
                    setUsers(result);
                } else {
                    console.error("Expected array, got", result);
                    setUsers([]);
                }
            } catch (e) {
                console.error("Failed to fetch users", e);
                setUsers([]);
            }
        };
        load();
    }, []);

    const handleShare = async () => {
        if (selected) {
            await shareTask(taskId, selected);
            onShared();
        }
    };

    return (
        <div className="modal">
            <h2>Share Task</h2>
            <select onChange={(e) => setSelected(e.target.value)}>
                <option value="">Select a user</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.email}
                    </option>
                ))}
            </select>
            <button onClick={handleShare}>Share</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default ShareModal;

