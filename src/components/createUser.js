"use client";

import React, { useState } from "react";
import api from "../app/api";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const handleCreateUser = async () => {
    try {
      const response = await api.post("/users/", { name });
      
      setSuccess("User created successfully!");
      console.log("User created:", response);
      localStorage.setItem("userId", response.data.id); 

      setTimeout(() => {
        router.push("/CheckInOut");
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "An error occurred while creating the user";
      setError(errorMessage);
      console.error(error);
    }
  };

  return (
    <div className="container">      
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

      {success && <p className="text-success mt-2">{success}</p>}
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
