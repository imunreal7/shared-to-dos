// src/routes/user.routes.ts
import { FastifyInstance } from "fastify";
import { handleLoginOrSignup } from "../controllers/auth.controller";
import { verifyFirebaseToken } from "../middleware/auth";

export default async function userRoutes(server: FastifyInstance) {
    server.get("/me", { preHandler: verifyFirebaseToken }, handleLoginOrSignup);
}

