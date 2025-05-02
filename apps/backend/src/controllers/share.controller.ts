// src/controllers/share.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import * as ShareModel from "../models/share.model";

export async function shareTaskHandler(req: FastifyRequest, res: FastifyReply) {
    const { taskId, userId } = req.body as { taskId: string; userId: string };
    const result = await ShareModel.shareTask(req.server, taskId, userId);
    return res.send(result);
}

