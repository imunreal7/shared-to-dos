import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

// Attach token automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("idToken");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function loginRequest(idToken: string) {
    // ensures user exists in DB
    return API.get("/users/me", { headers: { Authorization: `Bearer ${idToken}` } });
}

export async function fetchTasks() {
    const res = await API.get("/tasks");
    return res.data;
}

export async function createTask(title: string, description: string) {
    const res = await API.post("/tasks", { title, description });
    return res.data;
}

export async function updateTask(id: string, title: string, description: string) {
    const res = await API.put(`/tasks/${id}`, { title, description });
    return res.data;
}

export async function deleteTask(id: string) {
    return API.delete(`/tasks/${id}`);
}

export async function shareTask(taskId: string, userId: string) {
    const res = await API.post("/tasks/share", { taskId, userId });
    return res.data;
}
