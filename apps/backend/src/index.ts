import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { registerRoutes } from "./routes";

const server = Fastify({ logger: true });

async function build() {
    await server.register(fastifyCors);
    await registerRoutes(server);

    try {
        await server.listen({ port: 3001 });
        console.log("Server running on http://localhost:3001");
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

build();

