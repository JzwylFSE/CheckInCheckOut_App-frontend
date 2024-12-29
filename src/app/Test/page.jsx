"use client";

import React, { useState } from "react";
import api from "../api"; // Assuming your api instance is imported from here

export default function Test() {
  const [name, setName] = useState(""); // Input for name
  const [statusMessage, setStatusMessage] = useState(""); // Status message display
  const [userId, setUserId] = useState(null); // Store the user ID after creation

  // Function to create a new user
  const handleCreateUser = async () => {
    try {
      const response = await api.post("/users/", { name }); // POST request to create user
      const newUserId = response.data.id;

      // Store the user ID locally and update state
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
      setStatusMessage(`User created successfully! ID: ${newUserId}`);

      console.log("User created:", response.data);
    } catch (error) {
      setStatusMessage("An error occurred while creating the user.");
      console.error("Create User Error:", error);
    }
  };

  // Function to check in a user
  const handleCheckIn = async () => {
    try {
      if (!userId) {
        setStatusMessage("No user ID found. Please create a user first.");
        return;
      }

      // POST request to check in user with JSON payload
      await api.post("/check-in/", { user: userId });
      setStatusMessage(`User with ID ${userId} checked in successfully.`);
      console.log(`User with ID ${userId} checked in.`);
    } catch (error) {
      setStatusMessage("Error during check-in.");
      console.error("Check In Error:", error);
    }
  };

  // Function to check out a user
  const handleCheckOut = async () => {
    try {
      if (!userId) {
        setStatusMessage("No user ID found. Please create a user first.");
        return;
      }

      // POST request to check out user with ID in the URL
      await api.put(`/check-out/${userId}/`);
      setStatusMessage(`User with ID ${userId} checked out successfully.`);
      console.log(`User with ID ${userId} checked out.`);
    } catch (error) {
      setStatusMessage("Error during check-out.");
      console.error("Check Out Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Test User Creation, Check-In, and Check-Out</h2>

      {/* Input for creating a new user */}
      <div className="form-group">
        <label>Enter Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>

      <button onClick={handleCreateUser} className="btn btn-primary mt-2">
        Create User
      </button>

      {/* Display status messages */}
      {statusMessage && <p className="text-info mt-2">{statusMessage}</p>}

      {/* Buttons for check-in and check-out */}
      {userId && (
        <div>
          <button onClick={handleCheckIn} className="btn btn-success mt-2">
            Check In
          </button>
          <button onClick={handleCheckOut} className="btn btn-danger mt-2 ml-2">
            Check Out
          </button>
        </div>
      )}
    </div>
  );
}
