import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import OrderModal from './components/OrderModal';
import { Plus } from 'lucide-react';

function App() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = async (newOrder) => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      fetchOrders();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const order = orders.find(o => o.id === id);
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, status }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <div className="fade-in">
          <h1>Elbambai</h1>
          <p style={{ color: 'var(--text-muted)' }}>Keep track of every masterpiece.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          New Order
        </button>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading elegance...</div>
      ) : (
        <Dashboard orders={orders} onUpdateStatus={handleUpdateStatus} />
      )}

      {isModalOpen && (
        <OrderModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrder}
        />
      )}
    </div>
  );
}

export default App;
