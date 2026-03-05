const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'orders.db');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
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

const getOrders = () => {
    return db.prepare('SELECT * FROM orders ORDER BY deadline ASC').all();
};

const getOrderById = (id) => {
    return db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
};

const createOrder = (order) => {
    const { customer_name, description, deadline, urgency } = order;
    const info = db.prepare(
        'INSERT INTO orders (customer_name, description, deadline, urgency) VALUES (?, ?, ?, ?)'
    ).run(customer_name, description, deadline, urgency || 'normal');
    return { id: info.lastInsertRowid, ...order };
};

const updateOrder = (id, updates) => {
    const { customer_name, description, deadline, status, urgency } = updates;
    db.prepare(`
        UPDATE orders 
        SET customer_name = ?, description = ?, deadline = ?, status = ?, urgency = ? 
        WHERE id = ?
    `).run(customer_name, description, deadline, status, urgency, id);
    return getOrderById(id);
};

const deleteOrder = (id) => {
    return db.prepare('DELETE FROM orders WHERE id = ?').run(id);
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
