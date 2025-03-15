import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      username: email,
      password: password,
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};