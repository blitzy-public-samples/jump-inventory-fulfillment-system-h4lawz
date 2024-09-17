import axios from 'axios';

// HUMAN ASSISTANCE NEEDED
// The following code may need additional error handling and configuration for production readiness.
// Consider adding proper error handling, request timeouts, and API base URL configuration.

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API base URL

export async function fetchData(endpoint: string, params: object = {}): Promise<any> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function postData(endpoint: string, data: object): Promise<any> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}