#!/bin/bash

# Build frontend
npm run build

# Deploy backend to Google App Engine
gcloud app deploy backend/app.yaml

# Deploy frontend to Google Cloud Storage
gsutil -m rsync -r build gs://$GCS_BUCKET_NAME

# HUMAN ASSISTANCE NEEDED
# Update Cloud SQL database schema
# TODO: Add specific commands to run database migrations
# Example:
# gcloud sql connect YOUR_INSTANCE_NAME --user=root < migrations/schema_update.sql

echo "Deployment complete."