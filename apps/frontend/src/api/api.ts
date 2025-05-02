import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

// Attach Firebase ID token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("idToken");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Ensure user exists in backend DB
export async function loginRequest(idToken: string) {
    return API.get("/users/me", {
        headers: { Authorization: `Bearer ${idToken}` },
    });
}

// Fetch tasks with filter support
export async function fetchTasks(filter = "all") {
    const res = await API.get(`/tasks?filter=${filter}`);
    return res.data;
}

// Task CRUD operations
export async function createTask(title: string, description: string) {
    const res = await API.post("/tasks", { title, description });
    return res.data;
}

export async function updateTask(id: string, title: string, description: string) {
    const res = await API.put(`/tasks/${id}`, { title, description });
    return res.data;
}

export async function deleteTask(id: string) {
    const res = await API.delete(`/tasks/${id}`);
    return res.data;
}

// Share task with another user
export async function shareTask(taskId: string, userId: string) {
    const res = await API.post("/tasks/share", { taskId, targetUserId: userId });
    return res.data;
}

// src/api/api.ts
export async function fetchUsers() {
    const res = await API.get("/users"); // hits GET /users
    return res.data; // this is an array of users
}

export async function signupRequest(idToken: string) {
    return API.post("/users/signup", null, {
        headers: { Authorization: `Bearer ${idToken}` },
    });
}

