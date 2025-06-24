import React from 'react';
import styled, { keyframes } from 'styled-components';
import './Prompt.css';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.3s ease-out;
`;

const Modal = styled.div`
  background: #fff;
  padding: 36px 32px 28px 32px;
  border-radius: 18px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
`;

const Header = styled.div`
  margin-bottom: 18px;
`;

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Body = styled.div`
  margin-bottom: 28px;
`;

const Message = styled.p`
  font-size: 1.13rem;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

const ConfirmBtn = styled.button`
  padding: 13px 44px;
  border: none;
  border-radius: 12px;
  font-size: 1.13rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.18);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.22);
  }
`;

const Prompt = ({ title, message, onConfirm }) => {
  const handleConfirm = () => {
    if (window._handcricket_onPromptConfirm) {
      window._handcricket_onPromptConfirm();
      window._handcricket_onPromptConfirm = null;
    } else if (onConfirm) {
      onConfirm();
    }
  };
  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Body>
          <Message>{message}</Message>
        </Body>
        <Footer>
          <ConfirmBtn onClick={handleConfirm}>
            OK
          </ConfirmBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default Prompt; 