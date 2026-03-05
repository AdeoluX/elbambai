import React from 'react';
import OrderCard from './OrderCard';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = ({ orders, onUpdateStatus }) => {
    if (orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card empty-state"
                style={{ textAlign: 'center' }}
            >
                <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No orders currently in the atelier.</h3>
                <p>Start by adding a new creation to your list.</p>
            </motion.div>
        );
    }

    return (
        <motion.div layout className="grid">
            <AnimatePresence>
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={onUpdateStatus}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;
