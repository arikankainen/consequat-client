import React from 'react';
import Modal from './Modal';

import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  Button,
  WhiteButton,
  ButtonArea
} from './Styles';

interface ConfirmationProps {
  open: boolean;
  topic: string;
  text: string;
  handleOk: () => void;
  handleCancel: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ open, topic, text, handleOk, handleCancel }) => {
  return (
    <Modal isOpen={open}>
      <BackDrop>
        <FloatingContainer>
          <Container>
            <Topic>{topic}</Topic>
            <Content>
              {text}
            </Content>
            <ButtonArea>
              <WhiteButton onClick={handleCancel}>Cancel</WhiteButton>
              <Button onClick={handleOk}>OK</Button>
            </ButtonArea>
          </Container>
        </FloatingContainer>
      </BackDrop>
    </Modal>
  );
};

export default Confirmation;