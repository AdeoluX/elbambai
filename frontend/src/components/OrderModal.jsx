import React, { useState } from 'react';
import { X } from 'lucide-react';

const OrderModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        description: '',
        deadline: '',
        urgency: 'normal'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div className="glass-card fade-in" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg)', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2 style={{ color: 'var(--primary)' }}>Creational Details</h2>
                    <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Customer Name</label>
                        <input
                            required
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                background: 'var(--surface)',
                                border: '1px solid var(--glass)',
                                borderRadius: '12px',
                                padding: '0.8rem',
                                color: 'white'
                            }}
                            placeholder="e.g. Elena Gilbert"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description / Fabric</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                background: 'var(--surface)',
                                border: '1px solid var(--glass)',
                                borderRadius: '12px',
                                padding: '0.8rem',
                                color: 'white',
                                minHeight: '100px'
                            }}
                            placeholder="e.g. Silk Evening Gown, Emerald Green"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Deadline</label>
                            <input
                                required
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--glass)',
                                    borderRadius: '12px',
                                    padding: '0.8rem',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Urgency</label>
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--glass)',
                                    borderRadius: '12px',
                                    padding: '0.8rem',
                                    color: 'white'
                                }}
                            >
                                <option value="normal">Normal</option>
                                <option value="high">High priority</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        Schedule Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
