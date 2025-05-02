// src/controllers/auth.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUserByEmail } from "../models/user.model";

export async function handleLoginOrSignup(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, firebaseUid } = request.user!;

    let user = await getUserByEmail(request.server, email);
    if (!user) {
        user = await createUser(request.server, email, name, firebaseUid);
    }

    return reply.send({ user });
}

