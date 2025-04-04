import { useEffect, useState } from "react";
import {
  LogsContainer,
  LogsTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from "../../styles/SecurityStyles";
import axios from "axios";

// Define the type for a log entry
interface Log {
  timestamp: string;
  user: string;
  action: string;
  ipAddress: string;
}

const ActivityLogs = () => {
  // State to store logs
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch activity logs from API when component mounts
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/api/security/activity-logs");
        setLogs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching activity logs:", err);
        setError("Failed to load activity logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <LogsContainer>
      <h1>Activity Logs</h1>

      {/* Display loading message */}
      {loading && <p>Loading activity logs...</p>}

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display table only if logs exist */}
      {!loading && !error && logs.length > 0 ? (
        <LogsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Timestamp</TableHeader>
              <TableHeader>User</TableHeader>
              <TableHeader>Action</TableHeader>
              <TableHeader>IP Address</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableData>{log.timestamp}</TableData>
                <TableData>{log.user}</TableData>
                <TableData>{log.action}</TableData>
                <TableData>{log.ipAddress}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </LogsTable>
      ) : (
        !loading && <p>No activity logs found.</p>
      )}
    </LogsContainer>
  );
};

export default ActivityLogs;
