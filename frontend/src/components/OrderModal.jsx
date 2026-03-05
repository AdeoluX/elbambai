import React, { useState } from 'react';
import { X } from 'lucide-react';

const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--glass)',
    borderRadius: '12px',
    padding: '0.9rem',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
};

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
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div className="glass-card fade-in" style={{
                width: '100%',
                maxWidth: '560px',
                background: 'var(--bg)',
                border: '1px solid var(--primary)',
                borderRadius: '24px 24px 0 0',
                maxHeight: '92dvh',
                overflowY: 'auto',
                padding: '1.5rem',
            }}>
                {/* Drag handle */}
                <div style={{ width: '40px', height: '4px', background: 'var(--glass)', borderRadius: '99px', margin: '0 auto 1.5rem' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>New Order</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--surface)',
                            color: 'var(--text-muted)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            flexShrink: 0,
                        }}
                    ><X size={18} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Name</label>
                        <input
                            required
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            style={inputStyle}
                            placeholder="e.g. Elena Gilbert"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description / Fabric</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
                            placeholder="e.g. Silk Evening Gown, Emerald Green"
                        />
                    </div>

                    <div className="modal-row">
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deadline</label>
                            <input
                                required
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                style={{ ...inputStyle, colorScheme: 'dark' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Urgency</label>
                            <select
                                name="urgency"
                                value={formData.urgency}
                                onChange={handleChange}
                                style={{ ...inputStyle, cursor: 'pointer' }}
                            >
                                <option value="normal">Normal</option>
                                <option value="high">High Priority ⚡</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '1rem' }}>
                        Schedule Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
