import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContainer, DetailRow } from "../../styles/UserStyles";
import { Button } from "../../components/ui/Button";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status?: "active" | "inactive";
  createdAt?: string;
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <UserContainer>
        <p style={{ textAlign: "center" }}>Loading user details...</p>
      </UserContainer>
    );
  }

  if (error) {
    return (
      <UserContainer>
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      </UserContainer>
    );
  }

  if (!user) {
    return (
      <UserContainer>
        <p style={{ textAlign: "center" }}>No user data found.</p>
      </UserContainer>
    );
  }

  return (
    <UserContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>User Details</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
        <DetailRow>
          <strong>ID:</strong> <span>{user.id}</span>
        </DetailRow>
        <DetailRow>
          <strong>Name:</strong> <span>{user.name}</span>
        </DetailRow>
        <DetailRow>
          <strong>Email:</strong> <span>{user.email}</span>
        </DetailRow>
        <DetailRow>
          <strong>Role:</strong> <span>{user.role}</span>
        </DetailRow>
        {user.status && (
          <DetailRow>
            <strong>Status:</strong>{" "}
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "16px",
                backgroundColor: user.status === "active" ? "#d1fae5" : "#fee2e2",
                color: user.status === "active" ? "#065f46" : "#991b1b",
                fontWeight: 500,
              }}
            >
              {user.status}
            </span>
          </DetailRow>
        )}
        {user.createdAt && (
          <DetailRow>
            <strong>Created At:</strong>{" "}
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </DetailRow>
        )}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Button onClick={() => navigate("/users")}>← Back to Users</Button>
      </div>
    </UserContainer>
  );
};

export default UserDetails;
