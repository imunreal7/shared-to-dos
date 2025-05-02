// src/types/user.d.ts
import "fastify";

declare module "fastify" {
    interface FastifyRequest {
        user: {
            firebaseUid: string;
            dbId: string;
            email: string;
            name: string;
        };
    }
}

