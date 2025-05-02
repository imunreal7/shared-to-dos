// 1) Load env early
import "dotenv/config";

import Fastify from "fastify";
import dbPlugin from "./plugins/db.js";
import { initFirebase } from "./plugins/firebase.js";
import { registerRoutes } from "./routes/index.js";

const server = Fastify({ logger: true });

async function build() {
    initFirebase();

    // Register Postgres plugin
    await server.register(dbPlugin);

    // DEBUG: confirm that pg exists
    server.log.info({ hasPg: !!(server as any).pg }, "postgres plugin loaded");

    // Register all routes
    await registerRoutes(server);

    await server.listen({ port: 3001 });
}

build().catch((err) => {
    server.log.error(err);
    process.exit(1);
});

