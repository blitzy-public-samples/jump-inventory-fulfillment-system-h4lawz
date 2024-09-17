import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.auth.models import User
from backend.auth.utils import verify_password, create_access_token

client = TestClient(app)

def test_user_registration():
    response = client.post(
        "/auth/register",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["username"] == "testuser"
    assert response.json()["email"] == "test@example.com"

def test_user_login():
    # First, register a user
    client.post(
        "/auth/register",
        json={"username": "loginuser", "email": "login@example.com", "password": "loginpassword"}
    )
    
    # Now, try to login
    response = client.post(
        "/auth/login",
        data={"username": "loginuser", "password": "loginpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_token_generation_and_validation():
    # Generate a token
    token = create_access_token(data={"sub": "testuser"})
    
    # Use the token to access a protected route
    response = client.get(
        "/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

def test_password_hashing_and_verification():
    # HUMAN ASSISTANCE NEEDED
    # This test assumes that there's a function to get a user by username
    # If such a function doesn't exist, it needs to be implemented
    user = User.get_by_username("testuser")
    assert user is not None
    
    # Test that the stored password is hashed
    assert user.hashed_password != "testpassword"
    
    # Test password verification
    assert verify_password("testpassword", user.hashed_password)
    assert not verify_password("wrongpassword", user.hashed_password)