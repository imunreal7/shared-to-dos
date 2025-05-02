import { FastifyInstance } from "fastify";
import { handleLogin, handleSignup } from "../controllers/auth.controller";
import { getAllUsersHandler } from "../controllers/user.controller";
import { verifyFirebaseToken } from "../middleware/auth";

export default async function userRoutes(server: FastifyInstance) {
    server.get("/me", { preHandler: verifyFirebaseToken }, handleLogin);
    server.get("/", { preHandler: verifyFirebaseToken }, getAllUsersHandler);
    server.post("/signup", { preHandler: verifyFirebaseToken }, handleSignup);
}

