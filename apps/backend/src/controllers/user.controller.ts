// src/controllers/user.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";

export async function getAllUsersHandler(req: FastifyRequest, res: FastifyReply) {
    const currentUserId = req.user.dbId;

    const { rows } = await req.server.pg.query("SELECT id, email FROM users WHERE id != $1", [
        currentUserId,
    ]);

    return res.send(rows); // returns array of users
}

