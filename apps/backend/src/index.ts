// 1) Load env early
import "dotenv/config";

import Fastify from "fastify";
import fastifyCors from "@fastify/cors"; // ← import
import dbPlugin from "./plugins/db.js";
import { initFirebase } from "./plugins/firebase.js";
import { registerRoutes } from "./routes/index.js";

const server = Fastify({ logger: true });

async function build() {
    initFirebase();

    // 2) Register CORS
    await server.register(fastifyCors, {
        methods: ["GET", "POST", "PUT", "DELETE"],
        origin: (origin, cb) => {
            // allow requests from your frontend dev server:
            cb(null, origin === "http://localhost:5173"); // Vite default
            // or simply: cb(null, true) to allow all
        },
        credentials: true,
    });

    // 3) Register Postgres plugin
    await server.register(dbPlugin);

    server.log.info({ hasPg: !!(server as any).pg }, "postgres plugin loaded");

    // 4) Register your app routes
    await registerRoutes(server);

    // 5) Start listening
    await server.listen({ port: 3001 });
}

build().catch((err) => {
    server.log.error(err);
    process.exit(1);
});

