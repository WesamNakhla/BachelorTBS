// src/pages/Users/UserManagement.tsx

import { useEffect, useState } from "react";
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
} from "@/styles/UserStyles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserModal from "./UserModal";
import UserDetailsModal from "./UserDetailsModal";
import { fakeUsers } from "../data/fakeUsers";
import { fakeCustomers, Customer } from "../data/fakeCustomers";
import type { User } from "../types/User";

// Simulated current user role
const currentUserRole: string = "admin";

// Pagination settings
const ITEMS_PER_PAGE = 8;

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserRole === "customer") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setUsers(fakeUsers);
    setFilteredUsers(fakeUsers);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query);
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      return matchesQuery && matchesRole;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchQuery, roleFilter, users]);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    setFilteredUsers(updated);
    toast.success("User deleted successfully.");
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <UserContainer>
      <TopBar>
        <h1>User Management</h1>
        {currentUserRole === "admin" && (
          <AddButton
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
          >
            + Add User
          </AddButton>
        )}
      </TopBar>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <SearchInput
          placeholder="Search by name, email, or phone..."
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

      {paginatedUsers.length > 0 ? (
        <UserTable>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.id}</TableData>
                <TableData>{user.name}</TableData>
                <TableData>{user.email}</TableData>
                <TableData>{user.phone}</TableData>
                <TableData>{user.role}</TableData>
                <TableData>
                  <ActionButtons>
                    <ViewButton
                      onClick={() => {
                        if (user.role === "customer") {
                          const matchedCustomer = fakeCustomers.find((c) => c.userId === user.id);
                          if (matchedCustomer) {
                            setSelectedCustomer(matchedCustomer);
                          } else {
                            toast.error("Customer data not found.");
                          }
                        } else {
                          setSelectedUser(user);
                          setShowUserDetails(true);
                        }
                      }}
                    >
                      View
                    </ViewButton>

                    {currentUserRole === "admin" && (
                      <>
                        <EditButton
                          onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                          }}
                        >
                          Edit
                        </EditButton>
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", textAlign: "center", display: "flex", justifyContent: "center", gap: "8px" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: currentPage === index + 1 ? "#3b82f6" : "#f3f4f6",
                color: currentPage === index + 1 ? "#fff" : "#111827",
                cursor: "pointer",
              }}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal: Create or Edit */}
      {isModalOpen && (
        <UserModal
          mode={selectedUser ? "edit" : "create"}
          userToEdit={selectedUser ?? undefined}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onUserSaved={(updatedUser: User) => {
            let updatedList: User[];
            if (selectedUser) {
              updatedList = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
              toast.success("User updated successfully.");
            } else {
              updatedUser.id = users.length + 1;
              updatedList = [...users, updatedUser];
              toast.success("User created successfully.");
            }
            setUsers(updatedList);
            setFilteredUsers(updatedList);
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Modal: User Details */}
      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }}
        />
      )}

      {/* Modal: Customer Details */}
      {selectedCustomer && (
        <UserDetailsModal
          user={{
            id: selectedCustomer.userId,
            name: selectedCustomer.contactPerson,
            email: selectedCustomer.companyEmail,
            phone: selectedCustomer.companyPhone,
            role: "customer",
            companyName: selectedCustomer.companyName,
            companyEmail: selectedCustomer.companyEmail,
            orgNumber: selectedCustomer.orgNumber,
            zipCode: selectedCustomer.zipCode,
            city: selectedCustomer.city,
            address: selectedCustomer.address,
            contactPerson: selectedCustomer.contactPerson,
            companyPhone: selectedCustomer.companyPhone,
            customerType: selectedCustomer.customerType,
          }}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </UserContainer>
  );
};

export default UserManagement;
