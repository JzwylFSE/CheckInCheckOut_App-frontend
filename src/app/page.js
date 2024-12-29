"use client";

import CreateUser from "../components/createUser";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckInOut from "@/components/checkInOut";

export default function Home() {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      
      <header className="bg-primary text-white py-4 text-center">
        <h1 className="display-4">Check-In Check-Out App</h1>
        <p className="lead">
          Easily track your coding activity with simplicity and speed!
        </p>
      </header>

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 mb-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h2 className="card-title text-center text-dark">
                  Create User
                </h2>
                <p className="card-text text-center text-muted">
                  Create a new user to begin tracking your activity.
                </p>
                <CreateUser />
              </div>
            </div>
          </div>
        </div>
      </main>

    {/* <Link href="/Status">Status</Link> */}

      <footer className="text-center py-3 mt-auto bg-secondary text-white">
        <p>
          Built using <strong>React with Next.js</strong> and{" "}
          <strong>Django</strong>.{" "}
          {/* <Link href="/Test" className="text-light text-decoration-none">
            Test Page
          </Link> */}
        </p>
      </footer>
    </div>
  );
}
