import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SummaryCard, ActivityFeed } from 'frontend/src/components/dashboard';
import { fetchOrdersAsync } from 'frontend/src/store/slices/orderSlice';
import { fetchInventoryAsync } from 'frontend/src/store/slices/inventorySlice';
import { formatCurrency } from 'frontend/src/utils/formatters';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: any) => state.orders.items);
  const inventory = useSelector((state: any) => state.inventory.items);

  useEffect(() => {
    dispatch(fetchOrdersAsync());
    dispatch(fetchInventoryAsync());
  }, [dispatch]);

  const calculateSummaryMetrics = () => {
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
    const totalOrders = orders.length;
    const lowStockItems = inventory.filter((item: any) => item.quantity < item.reorderThreshold).length;

    return {
      totalRevenue,
      totalOrders,
      lowStockItems,
    };
  };

  const { totalRevenue, totalOrders, lowStockItems } = calculateSummaryMetrics();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary-cards">
        <SummaryCard title="Total Revenue" value={formatCurrency(totalRevenue)} />
        <SummaryCard title="Total Orders" value={totalOrders.toString()} />
        <SummaryCard title="Low Stock Items" value={lowStockItems.toString()} />
      </div>
      <ActivityFeed />
    </div>
  );
};

export default Dashboard;