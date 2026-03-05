import React from 'react';
import { Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderCard = ({ order, onUpdateStatus }) => {
    const getDaysRemaining = (deadline) => {
        const diff = new Date(deadline) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days;
    };

    const daysRemaining = getDaysRemaining(order.deadline);
    const isUrgent = daysRemaining <= 3 && order.status !== 'completed';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.5)' }}
            className="glass-card"
            style={{ position: 'relative' }}
        >
            {order.urgency === 'high' && <span className="urgency-badge">Priority</span>}
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontFamily: 'Outfit, sans-serif' }}>{order.customer_name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{order.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Calendar size={14} style={{ marginRight: '6px', color: 'var(--primary)' }} />
                    <span>{new Date(order.deadline).toLocaleDateString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: isUrgent ? 'var(--danger)' : 'inherit' }}>
                    <Clock size={14} style={{ marginRight: '6px' }} />
                    <span>{daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}</span>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`status-badge status-${order.status}`}>
                    {order.status}
                </span>

                <button
                    onClick={() => onUpdateStatus(order.id, order.status === 'completed' ? 'pending' : 'completed')}
                    style={{
                        background: 'none',
                        color: order.status === 'completed' ? 'var(--success)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px'
                    }}
                >
                    {order.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
                </button>
            </div>
        </motion.div>
    );
};

export default OrderCard;
