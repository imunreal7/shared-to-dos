import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUserByEmail } from "../models/user.model";

export async function handleLogin(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, firebaseUid } = request.user!;

    let user = await getUserByEmail(request.server, email);
    if (!user) {
        user = await createUser(request.server, firebaseUid, email, name);
    }

    return reply.send({ user });
}

export async function handleSignup(request: FastifyRequest, reply: FastifyReply) {
    const { email, name, firebaseUid } = request.user!;

    const user = await createUser(request.server, firebaseUid, email, name);
    return reply.send({ message: "User signed up successfully", user });
}

