variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "region" {
  description = "The region to deploy resources in"
  type        = string
  default     = "us-central1"
}

# Database configuration variables
variable "db_instance_name" {
  description = "The name of the Cloud SQL instance"
  type        = string
}

variable "db_tier" {
  description = "The machine type of the Cloud SQL instance"
  type        = string
  default     = "db-f1-micro"
}

variable "db_version" {
  description = "The database version for Cloud SQL"
  type        = string
  default     = "POSTGRES_13"
}

# Storage bucket variables
variable "storage_bucket_name" {
  description = "The name of the Google Cloud Storage bucket"
  type        = string
}

# Pub/Sub variables
variable "pubsub_topic_name" {
  description = "The name of the Pub/Sub topic"
  type        = string
}

variable "pubsub_subscription_name" {
  description = "The name of the Pub/Sub subscription"
  type        = string
}

# Cloud Functions variables
variable "function_name" {
  description = "The name of the Cloud Function"
  type        = string
}

variable "function_runtime" {
  description = "The runtime for the Cloud Function"
  type        = string
  default     = "python39"
}

variable "function_entry_point" {
  description = "The entry point for the Cloud Function"
  type        = string
}

# Identity Platform variables
variable "identity_platform_config" {
  description = "Configuration for Identity Platform"
  type = object({
    display_name             = string
    enable_email_link_signin = bool
  })
}

# Network configuration variables
variable "network_name" {
  description = "The name of the VPC network"
  type        = string
  default     = "default"
}

variable "subnet_name" {
  description = "The name of the subnet"
  type        = string
}

variable "subnet_cidr" {
  description = "The CIDR range for the subnet"
  type        = string
}