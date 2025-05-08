"use client";

import styled from "styled-components";
import { IoIosCloseCircle } from "react-icons/io";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(17, 17, 17, 0.62);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  /* padding: 2em; */
  border-radius: 1.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  animation: slideIn 0.3s forwards;
  position: relative;
  margin-top: 4em;

  > button {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    color: #333;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 1.2em;
  top: 1em;
  cursor: pointer;
  z-index: 2;
`;

export default function PopupModel({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <Modal>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircle size={22} />
        </CloseButton>

        {children}
      </Modal>
    </ModalOverlay>
  );
}
