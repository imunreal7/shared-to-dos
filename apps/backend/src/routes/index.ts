import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";

export async function registerRoutes(server: FastifyInstance) {
    server.register(userRoutes, { prefix: "/users" });
    server.register(taskRoutes, { prefix: "/tasks" });
}

