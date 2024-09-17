#!/bin/bash

# Install Python dependencies
pip install -r backend/requirements.txt

# Install Node.js dependencies
npm install

# Set up Google Cloud SDK
# HUMAN ASSISTANCE NEEDED
# The following block needs to be customized based on the specific Google Cloud SDK version and project requirements
echo "Installing Google Cloud SDK..."
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
gcloud auth application-default login

# Set up local database
# HUMAN ASSISTANCE NEEDED
# The following block assumes PostgreSQL is already installed. Adjust as needed for your specific setup
echo "Setting up local PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE myapp_dev;"
sudo -u postgres psql -c "CREATE USER myapp_user WITH PASSWORD 'myapp_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE myapp_dev TO myapp_user;"

# Set up environment variables
# HUMAN ASSISTANCE NEEDED
# The following block needs to be customized with actual environment variable values
echo "Setting up environment variables..."
echo "export DATABASE_URL=postgresql://myapp_user:myapp_password@localhost/myapp_dev" >> ~/.bashrc
echo "export GOOGLE_CLOUD_PROJECT=your-project-id" >> ~/.bashrc
echo "export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/credentials.json" >> ~/.bashrc
source ~/.bashrc

echo "Development environment setup complete."