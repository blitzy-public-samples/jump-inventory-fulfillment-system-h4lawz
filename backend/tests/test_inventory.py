import unittest
from unittest.mock import patch, MagicMock
from inventory.models import InventoryItem
from inventory.services import InventoryService
from shopify_integration.services import ShopifyService

class TestInventory(unittest.TestCase):

    def setUp(self):
        self.inventory_service = InventoryService()
        self.shopify_service = ShopifyService()

    def test_retrieve_inventory_items(self):
        # Mock database query
        with patch('inventory.models.InventoryItem.objects.all') as mock_query:
            mock_query.return_value = [
                InventoryItem(id=1, name='Item 1', quantity=10),
                InventoryItem(id=2, name='Item 2', quantity=20)
            ]
            
            items = self.inventory_service.get_all_items()
            
            self.assertEqual(len(items), 2)
            self.assertEqual(items[0].name, 'Item 1')
            self.assertEqual(items[1].quantity, 20)

    def test_update_inventory_quantities(self):
        item = InventoryItem(id=1, name='Test Item', quantity=10)
        
        with patch('inventory.models.InventoryItem.objects.get') as mock_get:
            mock_get.return_value = item
            
            self.inventory_service.update_quantity(1, 15)
            
            self.assertEqual(item.quantity, 15)
            item.save.assert_called_once()

    def test_add_new_inventory_item(self):
        new_item = InventoryItem(name='New Item', quantity=5)
        
        with patch('inventory.models.InventoryItem.objects.create') as mock_create:
            mock_create.return_value = new_item
            
            created_item = self.inventory_service.add_item('New Item', 5)
            
            self.assertEqual(created_item.name, 'New Item')
            self.assertEqual(created_item.quantity, 5)

    def test_inventory_sync_with_shopify(self):
        shopify_items = [
            {'id': 1, 'title': 'Item 1', 'inventory_quantity': 10},
            {'id': 2, 'title': 'Item 2', 'inventory_quantity': 20}
        ]
        
        with patch.object(ShopifyService, 'get_products', return_value=shopify_items):
            with patch.object(InventoryService, 'update_or_create_item') as mock_update:
                self.inventory_service.sync_with_shopify()
                
                self.assertEqual(mock_update.call_count, 2)
                mock_update.assert_any_call(1, 'Item 1', 10)
                mock_update.assert_any_call(2, 'Item 2', 20)

    def test_low_stock_alerts(self):
        low_stock_items = [
            InventoryItem(id=1, name='Low Stock Item', quantity=2),
            InventoryItem(id=2, name='Out of Stock Item', quantity=0)
        ]
        
        with patch('inventory.models.InventoryItem.objects.filter') as mock_filter:
            mock_filter.return_value = low_stock_items
            
            alerts = self.inventory_service.get_low_stock_alerts(threshold=5)
            
            self.assertEqual(len(alerts), 2)
            self.assertIn('Low Stock Item', [item.name for item in alerts])
            self.assertIn('Out of Stock Item', [item.name for item in alerts])

if __name__ == '__main__':
    unittest.main()