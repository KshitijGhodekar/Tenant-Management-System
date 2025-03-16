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

export const addProperty = async (property) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/properties/addPropertyDetails`, 
      property, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding property:", error.response?.data || error.message);
    throw error;
  }
};