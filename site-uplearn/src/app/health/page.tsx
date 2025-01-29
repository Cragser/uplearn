"use client";

import { useEffect, useState } from "react";

interface HealthStatus {
  status: string;
  timestamp: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("/api/health");
        const data = await response.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch health status" + err);
        setHealth(null);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">System Health Status</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : health ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Status:</span>
            <span
              className={
                health.status === "ok" ? "text-green-500" : "text-red-500"
              }
            >
              {health.status}
            </span>
          </div>
          <div>
            <span className="font-semibold">Last Updated:</span>
            <span className="ml-2">
              {new Date(health.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <div>Loading health status...</div>
      )}
    </div>
  );
}
