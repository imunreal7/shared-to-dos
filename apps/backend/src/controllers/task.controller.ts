// src/controllers/task.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import * as TaskModel from "../models/task.model";

export async function createTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { title, description } = req.body as { title: string; description: string };
    const createdBy = req.user.dbId;
    const task = await TaskModel.createTask(req.server, title, description, createdBy);
    return res.send(task);
}

export async function getTasksHandler(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.dbId;
    const filter = (req.query as { filter?: string })?.filter || "all";

    let tasks;

    switch (filter) {
        case "my":
            tasks = await TaskModel.getTasksCreatedByUser(req.server, userId);
            break;
        case "shared":
            tasks = await TaskModel.getTasksSharedWithUser(req.server, userId);
            break;
        default:
            tasks = await TaskModel.getAllTasksForUser(req.server, userId); // both created and shared
            break;
    }

    return res.send(tasks);
}

export async function updateTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
    const { title, description } = req.body as { title: string; description: string };
    const task = await TaskModel.updateTask(req.server, id, title, description);
    return res.send(task);
}

export async function deleteTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
    await TaskModel.deleteTask(req.server, id);
    return res.send({ message: "Task deleted" });
}

export async function getFilteredTasksHandler(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.dbId;
    const filter = (req.query as any).filter;

    switch (filter) {
        case "my":
            return res.send(await TaskModel.getMyTasks(req.server, userId));
        case "shared":
            return res.send(await TaskModel.getSharedTasks(req.server, userId));
        case "all":
        default:
            return res.send(await TaskModel.getAllTasksForUser(req.server, userId));
    }
}

export async function shareTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { taskId, targetUserId } = req.body as { taskId: string; targetUserId: string };
    await TaskModel.shareTaskWithUser(req.server, taskId, targetUserId);
    return res.send({ message: "Task shared" });
}

