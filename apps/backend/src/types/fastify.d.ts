import "fastify";

declare module "fastify" {
    interface FastifyInstance {
        pg: import("@fastify/postgres").FastifyPostgres;
    }
}

