import { createApiInstance } from 'frontend/src/services/api';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from 'frontend/src/utils/storage';

export async function login(username: string, password: string): Promise<boolean> {
  try {
    const api = createApiInstance();
    const response = await api.post('/auth/login', { username, password });
    
    if (response.data && response.data.token) {
      setLocalStorage('authToken', response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

export function logout(): void {
  removeLocalStorage('authToken');
  // HUMAN ASSISTANCE NEEDED
  // Consider adding an API call to invalidate the token on the server side
  // Example:
  // const api = createApiInstance();
  // await api.post('/auth/logout');
}