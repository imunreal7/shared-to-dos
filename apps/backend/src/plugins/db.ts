// src/plugins/db.ts
import fp from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import { FastifyInstance } from "fastify";

export default fp(async (server: FastifyInstance) => {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");
    server.register(fastifyPostgres, { connectionString: url });
});

