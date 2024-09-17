from celery import shared_task
from sqlalchemy.orm import Session
from backend.app.db.database import get_db
from backend.app.services.shopify import update_shopify_inventory
from backend.app.db.models import InventoryItem
from datetime import datetime

@shared_task
def update_inventory():
    # HUMAN ASSISTANCE NEEDED
    # The following code needs review and potential modifications:
    # - Error handling should be improved
    # - Logging should be added for better traceability
    # - Consider implementing batch processing for better performance
    # - Implement retry mechanism for failed Shopify updates
    
    db: Session = next(get_db())
    updated_count = 0

    try:
        inventory_items = db.query(InventoryItem).all()

        for item in inventory_items:
            success = update_shopify_inventory(item.shopify_id, item.quantity)
            if success:
                item.last_synced = datetime.utcnow()
                updated_count += 1

        db.commit()
    except Exception as e:
        db.rollback()
        # Log the error
        print(f"Error updating inventory: {str(e)}")
    finally:
        db.close()

    return updated_count