"use client";

import React, { useState, useEffect } from "react";
import { checkInUser, checkOutUser } from "../app/api";
import { useRouter, useSearchParams } from "next/navigation"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import StatusTable from "./statusTable";

export default function CheckInOut() {
  const [userId, setUserId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showStatusTable, setShowStatusTable] = useState(false); 
  const router = useRouter();
  const searchParams = useSearchParams(); 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); 
    } else {
      setStatusMessage("No user found. Please create a user first.");
    }

    const successMessage = searchParams.get("success");
    if (successMessage) {
      setStatusMessage(successMessage);
    }
  }, [searchParams]);

  // Check in a user
  const handleCheckIn = async () => {
    try {
      if (!userId) {
        setStatusMessage("No user ID found. Please create a user first.");
        return;
      }
      await checkInUser(userId);
      setStatusMessage(`Active! ✔️⚡`);
      setShowStatusTable(true); // Show the status table after check-in
    } catch (error) {
      setStatusMessage("You're already checked in.");
      console.error("Check-In Error:", error);
    }
  };

  // Check out a user
  const handleCheckOut = async () => {
    try {
      if (!userId) {
        setStatusMessage("No user ID found. Please create a user first.");
        return;
      }
      await checkOutUser(userId);
      setStatusMessage(`Inactive ❌`);
      setShowStatusTable(false); // Hide the status table after check-out
    } catch (error) {
      setStatusMessage("Cannot check out without first checking in.");
      console.error("Check-Out Error:", error);
    }
  };

  return (
    <div className="container py-4">
      <Link href="/">Go back</Link>
      <h2 className="text-center mb-4">Check In or Check Out</h2>

      <div className="text-center mb-3">
        <p className="lead">
          User ID: <span className="font-weight-bolder">{userId}</span>
        </p>
      </div>

      {statusMessage && (
        <div className="alert alert-info text-center">{statusMessage}</div>
      )}

      <div className="d-flex justify-content-center">
        <button onClick={handleCheckIn} className="btn btn-success me-2">
          Check In
        </button>
        <button onClick={handleCheckOut} className="btn btn-danger">
          Check Out
        </button>
      </div>

      {showStatusTable && (
        <div className="mt-4">
          <StatusTable />
        </div>
      )}
    </div>
  );
}
