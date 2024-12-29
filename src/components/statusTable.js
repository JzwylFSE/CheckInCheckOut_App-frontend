"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../app/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StatusTable() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [activity, setActivity] = useState(null); // Store the user's activity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          throw new Error("User ID not found. Please log in again.");
        }
        setUserId(storedUserId);

        const userResponse = await api.get(`/users/${storedUserId}/`);
        setUserName(userResponse.data.name);
        const activityResponse = await api.get(`/activities/${storedUserId}/`);

        setActivity(activityResponse.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No active activity found. Please check in first.");
        } else {
          setError("Error fetching user or activity data. Please try again.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Activity Status</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : activity ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">User Name</th>
                <th scope="col">Active Status</th>
                <th scope="col">Check-In Date/Time</th>
                <th scope="col">Check-Out Date/Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userId}</td>
                <td>{userName || "Unknown User"}</td>
                <td>
                  {activity.is_active ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td>
                  {activity.timestamp
                    ? new Date(activity.timestamp).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  {activity.end_time
                    ? new Date(activity.end_time).toLocaleString()
                    : "Ongoing"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">
          No activity found. Please check in to start tracking your activity.
        </p>
      )}
    </div>
  );
}
