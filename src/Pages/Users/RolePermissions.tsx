import { useState, useEffect } from "react";
import axios from "axios";
import {
  UserContainer,
  TableRow,
  TableHeader,
  TableData,
  Select,
  UserTable,
} from "../../styles/UserStyles";

// Define the type for a user
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const RolePermissions = () => {
  // State to store users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to update user role
  const updateRole = async (id: number, role: string) => {
    try {
      const response = await axios.put(`/api/users/${id}`, { role });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? { ...user, role } : user))
        );
      }
    } catch (err) {
      console.error("Error updating role:", err);
      setError("Failed to update user role.");
    }
  };

  return (
    <UserContainer>

      {/* Display loading message */}
      {loading && <p>Loading users...</p>}

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display table only if users exist */}
      {!loading && !error && users.length > 0 ? (
        <UserTable>
          <thead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>
                  <Select
                    value={user.role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      updateRole(user.id, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </Select>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </UserTable>
      ) : (
        !loading && <p>No users found.</p>
      )}
    </UserContainer>
  );
};

export default RolePermissions;
