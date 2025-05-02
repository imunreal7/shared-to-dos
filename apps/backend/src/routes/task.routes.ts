// src/routes/task.routes.ts
import { FastifyInstance } from "fastify";
import {
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler,
} from "../controllers/task.controller";
import { shareTaskHandler } from "../controllers/share.controller";
import { verifyFirebaseToken } from "../middleware/auth";

export default async function taskRoutes(server: FastifyInstance) {
    server.addHook("preHandler", verifyFirebaseToken);

    server.post("/", createTaskHandler);
    server.get("/", getTasksHandler);
    server.put("/:id", updateTaskHandler);
    server.delete("/:id", deleteTaskHandler);
    server.post("/share", shareTaskHandler);
}

