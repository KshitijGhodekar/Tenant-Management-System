const API_BASE_URL = "http://localhost:8080";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};