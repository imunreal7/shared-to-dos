// src/controllers/share.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import * as TaskModel from "../models/task.model";

export async function shareTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { taskId, targetUserId } = req.body as {
        taskId: string;
        targetUserId: string;
    };
    await TaskModel.shareTaskWithUser(req.server, taskId, targetUserId);
    return res.send({ message: "Task shared" });
}

