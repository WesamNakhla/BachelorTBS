import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserContainer,
  UserTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  EditButton,
  DeleteButton
} from "../../styles/UserStyles";

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserManagement = () => {
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
        setError("Failed to load users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user.");
    }
  };

  return (
    <UserContainer>
      <h1>User Management</h1>

      {/* Display loading message */}
      {loading && <p>Loading users...</p>}

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display table only if users exist */}
      {!loading && !error && users.length > 0 ? (
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.id}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.role}</TableData>
                <TableData>
                  <ActionButtons>
                    <EditButton disabled={loading}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(user.id)} disabled={loading}>
                      Delete
                    </DeleteButton>
                  </ActionButtons>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>
      ) : (
        !loading && <p>No users found.</p>
      )}
    </UserContainer>
  );
};

export default UserManagement;
