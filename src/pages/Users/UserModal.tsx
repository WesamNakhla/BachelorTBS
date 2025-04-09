// src/pages/Users/UserModal.tsx

import React from "react";
import styled from "styled-components";
import { ModalOverlay, ModalContent } from "../../styles/InvoiceStyles";
import CreateUser from "./CreateUser";
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
  
  // No close button included here
  const UserModal: React.FC<UserModalProps> = ({ onClose, onUserCreated }) => {
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