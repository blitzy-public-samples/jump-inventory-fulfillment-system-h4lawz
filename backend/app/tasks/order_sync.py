from celery import shared_task
from sqlalchemy.orm import Session
from backend.app.db.database import get_db
from backend.app.services.shopify import get_unfulfilled_orders
from backend.app.db.models import Order
from backend.app.schema.order import OrderCreate

@shared_task
def sync_orders():
    # HUMAN ASSISTANCE NEEDED
    # This function has a confidence level of 0.7, which is below the threshold of 0.8.
    # Please review and refine the implementation as needed.
    
    db: Session = next(get_db())
    try:
        shopify_orders = get_unfulfilled_orders()
        synced_count = 0

        for shopify_order in shopify_orders:
            existing_order = db.query(Order).filter(Order.shopify_id == shopify_order['id']).first()

            if existing_order:
                # Update existing order
                for key, value in shopify_order.items():
                    setattr(existing_order, key, value)
            else:
                # Create new order
                new_order = OrderCreate(**shopify_order)
                db_order = Order(**new_order.dict())
                db.add(db_order)
            
            synced_count += 1

        db.commit()
        return synced_count
    except Exception as e:
        db.rollback()
        # TODO: Implement proper error handling and logging
        print(f"Error synchronizing orders: {str(e)}")
        return 0
    finally:
        db.close()