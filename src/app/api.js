import axios from "axios";

// Create an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Create a new user
export const createUser = (name) => {
  return api.post("/users/", { name });
};

// Check in a user by user ID
export const checkInUser = (userId) => {
  return api.post("/check-in/", { "user": userId }); // Send the userId as part of the body
};

// Check out a user by user ID
export const checkOutUser = (userId) => {
  return api.put(`/check-out/${userId}/`);
};

// Get all users
export const getUsers = () => {
  return api.get("/users/");
};

// Get all activities
export const getActivities = () => {
  return api.get("/activities/");
};

// Delete a user by ID
export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}/`);
};

export default api;
