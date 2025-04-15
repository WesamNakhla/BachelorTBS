// src/pages/Users/UserModal.tsx

import React from "react";
import styled from "styled-components";
import { ModalOverlay, ModalContent } from "../../styles/InvoiceStyles";
import CreateUser from "./CreateUser";
import { useAuth } from "../../context/AuthContext"; // ✅ make sure this is the correct path
import type { User } from "../types/User";

// Props for the modal component
interface UserModalProps {
  onClose: () => void;
  onUserCreated: (newUser: User) => void;
}

// Wrapper to center modal
const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal to create a new user (admin only)
const UserModal: React.FC<UserModalProps> = ({ onClose, onUserCreated }) => {
  const { user } = useAuth(); // ✅ assumes your context provides user info including role

  if (!user || user.role !== "admin") {
    return null; // ⛔️ Non-admins should not see this modal
  }

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <CreateUser onCancel={onClose} onSuccess={onUserCreated} />
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default UserModal;
