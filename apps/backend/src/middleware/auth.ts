// src/middleware/auth.ts
import { FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";
import { getUserByFirebaseUid, createUser as createUserModel } from "../models/user.model.js";

export async function verifyFirebaseToken(request: FastifyRequest, reply: FastifyReply) {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return reply.status(401).send({ message: "No token provided" });
    }

    try {
        const token = authHeader.slice(7);
        const decoded = await admin.auth().verifyIdToken(token);
        const { uid, email = "", name = "" } = decoded;

        // 1) lookup or create the DB user
        let dbUser = await getUserByFirebaseUid(request.server, uid);
        if (!dbUser) {
            dbUser = await createUserModel(request.server, email, name, uid);
        }

        // 2) attach both IDs to the request
        request.user = {
            firebaseUid: uid,
            dbId: dbUser.id,
            email,
            name,
        };
    } catch (err) {
        return reply.status(401).send({ message: "Invalid token" });
    }
}

