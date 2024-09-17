# Output definitions for important resource information

# Database connection information
output "database_connection_name" {
  description = "The connection name of the Cloud SQL instance"
  value       = google_sql_database_instance.main.connection_name
}

output "database_ip" {
  description = "The IP address of the Cloud SQL instance"
  value       = google_sql_database_instance.main.ip_address.0.ip_address
}

# Storage bucket URLs
output "storage_bucket_url" {
  description = "The URL of the main storage bucket"
  value       = google_storage_bucket.main.url
}

# Pub/Sub topic and subscription IDs
output "pubsub_topic_id" {
  description = "The ID of the main Pub/Sub topic"
  value       = google_pubsub_topic.main.id
}

output "pubsub_subscription_id" {
  description = "The ID of the main Pub/Sub subscription"
  value       = google_pubsub_subscription.main.id
}

# Cloud Functions URLs
output "cloud_function_url" {
  description = "The URL of the main Cloud Function"
  value       = google_cloudfunctions_function.main.https_trigger_url
}

# Identity Platform configuration details
output "identity_platform_config" {
  description = "The configuration details for Identity Platform"
  value = {
    project_id    = google_identity_platform_config.main.project
    api_key       = google_identity_platform_config.main.api_key
    oauth_client_id = google_identity_platform_oauth_client.main.client_id
  }
  sensitive = true
}

# VPC and subnet information
output "vpc_id" {
  description = "The ID of the main VPC"
  value       = google_compute_network.main.id
}

output "subnet_ids" {
  description = "The IDs of the subnets in the main VPC"
  value       = google_compute_subnetwork.main[*].id
}

# HUMAN ASSISTANCE NEEDED
# Please review the following outputs and ensure they match the actual resource names in your Terraform configuration:
# - google_sql_database_instance.main
# - google_storage_bucket.main
# - google_pubsub_topic.main
# - google_pubsub_subscription.main
# - google_cloudfunctions_function.main
# - google_identity_platform_config.main
# - google_identity_platform_oauth_client.main
# - google_compute_network.main
# - google_compute_subnetwork.main
# Adjust the resource names if necessary to match your specific configuration.