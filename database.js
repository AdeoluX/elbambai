const { createClient } = require('@libsql/client');
const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize schema on startup
const initSchema = async () => {
    await client.execute(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            description TEXT,
            deadline TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            urgency TEXT DEFAULT 'normal',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

initSchema().catch(console.error);

const getOrders = async () => {
    const result = await client.execute('SELECT * FROM orders ORDER BY deadline ASC');
    return result.rows;
};

const getOrderById = async (id) => {
    const result = await client.execute({
        sql: 'SELECT * FROM orders WHERE id = ?',
        args: [id],
    });
    return result.rows[0] || null;
};

const createOrder = async (order) => {
    const { customer_name, description, deadline, urgency } = order;
    const result = await client.execute({
        sql: 'INSERT INTO orders (customer_name, description, deadline, urgency) VALUES (?, ?, ?, ?)',
        args: [customer_name, description, deadline, urgency || 'normal'],
    });
    return { id: Number(result.lastInsertRowid), ...order };
};

const updateOrder = async (id, updates) => {
    const { customer_name, description, deadline, status, urgency } = updates;
    await client.execute({
        sql: 'UPDATE orders SET customer_name = ?, description = ?, deadline = ?, status = ?, urgency = ? WHERE id = ?',
        args: [customer_name, description, deadline, status, urgency, id],
    });
    return getOrderById(id);
};

const deleteOrder = async (id) => {
    return client.execute({ sql: 'DELETE FROM orders WHERE id = ?', args: [id] });
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
