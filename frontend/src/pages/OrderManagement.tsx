import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderList, OrderDetail, FulfillmentModal } from 'frontend/src/components/orders';
import { fetchOrdersAsync, updateOrderAsync } from 'frontend/src/store/slices/orderSlice';
import { syncOrders } from 'frontend/src/services/shopify';

// HUMAN ASSISTANCE NEEDED
// This component may require additional refinement and error handling for production readiness.
// Please review and enhance as necessary.

const OrderManagement: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.items);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showFulfillmentModal, setShowFulfillmentModal] = useState(false);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
  };

  const handleFulfillOrder = (orderId: string) => {
    setSelectedOrder(orders.find((order: any) => order.id === orderId));
    setShowFulfillmentModal(true);
  };

  const handleFulfillmentComplete = async (fulfillmentData: any) => {
    await dispatch(updateOrderAsync({ ...selectedOrder, ...fulfillmentData }));
    setShowFulfillmentModal(false);
    setSelectedOrder(null);
  };

  const handleSyncOrders = async () => {
    try {
      await syncOrders();
      dispatch(fetchOrdersAsync());
    } catch (error) {
      console.error('Error syncing orders:', error);
      // TODO: Implement proper error handling and user notification
    }
  };

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <button onClick={handleSyncOrders}>Sync Orders with Shopify</button>
      <div className="order-management__content">
        <OrderList 
          orders={orders} 
          onOrderSelect={handleOrderSelect}
          onFulfillOrder={handleFulfillOrder}
        />
        {selectedOrder && (
          <OrderDetail 
            order={selectedOrder}
            onFulfillOrder={handleFulfillOrder}
          />
        )}
      </div>
      {showFulfillmentModal && (
        <FulfillmentModal
          order={selectedOrder}
          onComplete={handleFulfillmentComplete}
          onClose={() => setShowFulfillmentModal(false)}
        />
      )}
    </div>
  );
};

export default OrderManagement;