import React, { useState, useEffect } from "react";
import { shareTask } from "../api/api";
import axios from "axios";

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
        axios
            .get("/users") // assume you add GET /users in backend
            .then((res) => setUsers(res.data));
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
