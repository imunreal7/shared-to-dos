import { FastifyInstance } from "fastify";

export async function createTask(
    server: FastifyInstance,
    title: string,
    description: string,
    createdBy: string,
) {
    const { rows } = await server.pg.query(
        "INSERT INTO tasks (title, description, created_by) VALUES ($1, $2, $3) RETURNING *",
        [title, description, createdBy],
    );
    return rows[0];
}

export async function getTasksByUser(server: FastifyInstance, userId: string) {
    const { rows } = await server.pg.query(
        `
    SELECT t.*
    FROM tasks t
    LEFT JOIN task_shares s ON s.task_id = t.id
    WHERE t.created_by = $1 OR s.shared_with = $1
    ORDER BY t.created_at DESC
  `,
        [userId],
    );
    return rows;
}

export async function getTaskById(server: FastifyInstance, id: string) {
    const { rows } = await server.pg.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return rows[0];
}

export async function updateTask(
    server: FastifyInstance,
    id: string,
    title: string,
    description: string,
) {
    const { rows } = await server.pg.query(
        "UPDATE tasks SET title = $1, description = $2, updated_at = now() WHERE id = $3 RETURNING *",
        [title, description, id],
    );
    return rows[0];
}

export async function deleteTask(server: FastifyInstance, id: string) {
    await server.pg.query("DELETE FROM tasks WHERE id = $1", [id]);
}

export async function getAllTasksForUser(server: FastifyInstance, userId: string) {
    const client = await server.pg.connect();
    try {
        const { rows } = await client.query(
            `
        SELECT * FROM tasks
        WHERE created_by = $1
           OR id IN (
              SELECT task_id FROM shared_tasks WHERE user_id = $1
           )
        ORDER BY created_at DESC
        `,
            [userId],
        );
        return rows;
    } finally {
        client.release();
    }
}

export async function getMyTasks(server: FastifyInstance, userId: string) {
    const client = await server.pg.connect();
    try {
        const { rows } = await client.query(
            `SELECT * FROM tasks WHERE created_by = $1 ORDER BY created_at DESC`,
            [userId],
        );
        return rows;
    } finally {
        client.release();
    }
}

export async function getSharedTasks(server: FastifyInstance, userId: string) {
    const client = await server.pg.connect();
    try {
        const { rows } = await client.query(
            `
        SELECT t.*
        FROM tasks t
        JOIN shared_tasks s ON s.task_id = t.id
        WHERE s.user_id = $1
        ORDER BY t.created_at DESC
        `,
            [userId],
        );
        return rows;
    } finally {
        client.release();
    }
}

export async function shareTaskWithUser(
    server: FastifyInstance,
    taskId: string,
    targetUserId: string,
) {
    const client = await server.pg.connect();
    try {
        await client.query(
            `INSERT INTO shared_tasks (task_id, user_id) VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
            [taskId, targetUserId],
        );
    } finally {
        client.release();
    }
}

