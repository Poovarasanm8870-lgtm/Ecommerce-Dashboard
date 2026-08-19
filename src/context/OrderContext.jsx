import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ORDERS } from '../data/mockOrders';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('luxe_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('luxe_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      ...orderData,
      id: newId,
      date: now,
      status: 'Processing',
      paymentStatus: orderData.paymentMethod.includes('Cash') ? 'Pending' : 'Paid',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeline: [
        { status: 'Order Placed', date: formattedDate, completed: true },
        { status: 'Processing', date: formattedDate, completed: true },
        { status: 'Shipped', date: 'Pending', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const statusOrder = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const targetIndex = statusOrder.indexOf(newStatus);
    const formattedTime = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let updatedTimeline = order.timeline.map(t => {
          const idx = statusOrder.indexOf(t.status);
          if (newStatus === 'Cancelled') {
            if (t.status === 'Cancelled') return { ...t, completed: true, date: formattedTime };
            return t;
          }
          if (idx <= targetIndex && idx !== -1) {
            return { ...t, completed: true, date: t.date === 'Pending' ? formattedTime : t.date };
          }
          return t;
        });

        return {
          ...order,
          status: newStatus,
          paymentStatus: newStatus === 'Delivered' ? 'Paid' : order.paymentStatus,
          timeline: updatedTimeline
        };
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
