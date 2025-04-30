import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyPostgres from "@fastify/postgres";

export default fp(async (server: FastifyInstance) => {
    server.register(fastifyPostgres, {
        connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@db:5432/todo",
    });
});

