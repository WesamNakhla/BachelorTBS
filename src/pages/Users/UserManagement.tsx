// src/pages/Users/UserManagement.tsx

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
  DeleteButton,
  ViewButton,
  TopBar,
  SearchInput,
  AddButton,
  FilterSelect,
} from "../../styles/UserStyles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import type { User } from "../types/User"; // Removed unused UserRole import

// ✅ Simulated current user role (use real auth in production)
const currentUserRole: string = "admin";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // ✅ Block access for customer role
  useEffect(() => {
    if (currentUserRole === "customer") {
      navigate("/");
    }
  }, [navigate]);

  // ✅ Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        const data = Array.isArray(response.data) ? response.data : [];
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Filter logic for search and role
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchQuery =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = roleFilter ? user.role === roleFilter : true;
      return matchQuery && matchRole;
    });

    setFilteredUsers(filtered);
  }, [searchQuery, roleFilter, users]);

  // ✅ Delete user handler
  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/users/${userId}`);
      const updatedList = users.filter((user) => user.id !== userId);
      setUsers(updatedList);
      setFilteredUsers(updatedList);
      toast.success("User deleted successfully.");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <UserContainer>
      <TopBar>
        <h1>User Management</h1>
        {currentUserRole === "admin" && (
          <AddButton onClick={() => setIsModalOpen(true)}>+ Add User</AddButton>
        )}
      </TopBar>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <SearchInput
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="customer">Customer</option>
        </FilterSelect>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : filteredUsers.length > 0 ? (
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.id}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.role}</TableData>
                <TableData>
                  <ActionButtons>
                    <ViewButton onClick={() => navigate(`/users/${user.id}`)}>View</ViewButton>
                    {currentUserRole === "admin" && (
                      <>
                        <EditButton onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</EditButton>
                        <DeleteButton onClick={() => handleDelete(user.id)}>Delete</DeleteButton>
                      </>
                    )}
                  </ActionButtons>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </UserTable>
      ) : (
        <p>No users found.</p>
      )}

      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onUserCreated={(newUser) => {
            const updatedList = [...users, newUser];
            setUsers(updatedList);
            setFilteredUsers(updatedList);
            toast.success("User created successfully.");
          }}
        />
      )}
    </UserContainer>
  );
};

export default UserManagement;
