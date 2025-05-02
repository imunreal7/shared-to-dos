import { FastifyInstance } from "fastify";

export async function getUserByFirebaseUid(server: FastifyInstance, firebaseUid: string) {
    const { rows } = await server.pg.query("SELECT * FROM users WHERE firebase_uid = $1", [
        firebaseUid,
    ]);
    return rows[0];
}

export async function createUser(
    server: FastifyInstance,
    email: string,
    displayName: string,
    firebaseUid: string,
) {
    const { rows } = await server.pg.query(
        "INSERT INTO users (email, display_name) VALUES ($1, $2) RETURNING *",
        [email, displayName, firebaseUid],
    );
    return rows[0];
}

export async function getUserByEmail(server: FastifyInstance, email: string) {
    const { rows } = await server.pg.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
}

export async function getUserById(server: FastifyInstance, id: string) {
    const { rows } = await server.pg.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

