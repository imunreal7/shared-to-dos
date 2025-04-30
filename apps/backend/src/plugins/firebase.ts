import fp from "fastify-plugin";
import admin from "firebase-admin";
import { FastifyInstance } from "fastify";

export default fp(async (server: FastifyInstance) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }

    server.decorate("firebaseAdmin", admin);
});

