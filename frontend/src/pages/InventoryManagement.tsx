import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InventoryGrid, BarcodeScanner, LowStockAlert } from 'frontend/src/components/inventory';
import { fetchInventoryAsync, updateInventoryItemAsync } from 'frontend/src/store/slices/inventorySlice';
import { syncProducts } from 'frontend/src/services/shopify';

// HUMAN ASSISTANCE NEEDED
// The confidence level is below 0.8, so some aspects of this component may need review or improvement.
// Please check the implementation of the following features:
// - Barcode scanning integration
// - Low stock alert logic
// - Shopify sync process

const InventoryManagement: React.FC = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state: any) => state.inventory.items);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    dispatch(fetchInventoryAsync());
  }, [dispatch]);

  const handleInventoryUpdate = async (itemId: string, newQuantity: number) => {
    await dispatch(updateInventoryItemAsync({ id: itemId, quantity: newQuantity }));
  };

  const handleBarcodeScanned = (barcode: string) => {
    // TODO: Implement barcode scanning logic
    console.log('Barcode scanned:', barcode);
  };

  const handleSyncWithShopify = async () => {
    setIsSyncing(true);
    try {
      await syncProducts();
      dispatch(fetchInventoryAsync());
    } catch (error) {
      console.error('Error syncing with Shopify:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="inventory-management">
      <h1>Inventory Management</h1>
      <LowStockAlert inventory={inventory} />
      <BarcodeScanner onScan={handleBarcodeScanned} />
      <button onClick={handleSyncWithShopify} disabled={isSyncing}>
        {isSyncing ? 'Syncing...' : 'Sync with Shopify'}
      </button>
      <InventoryGrid 
        inventory={inventory} 
        onUpdateQuantity={handleInventoryUpdate} 
      />
    </div>
  );
};

export default InventoryManagement;