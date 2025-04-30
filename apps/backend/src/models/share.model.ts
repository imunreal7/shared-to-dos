import { FastifyInstance } from "fastify";

export async function shareTask(server: FastifyInstance, taskId: string, userId: string) {
    const { rows } = await server.pg.query(
        "INSERT INTO task_shares (task_id, shared_with) VALUES ($1, $2) RETURNING *",
        [taskId, userId],
    );
    return rows[0];
}

export async function getSharedUsers(server: FastifyInstance, taskId: string) {
    const { rows } = await server.pg.query(
        "SELECT u.* FROM users u INNER JOIN task_shares ts ON ts.shared_with = u.id WHERE ts.task_id = $1",
        [taskId],
    );
    return rows;
}

