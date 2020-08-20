import React, { useState } from 'react';
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

export interface ConfirmationProps {
  open?: boolean;
  topic?: string;
  text?: string;
  handleOk?: () => void;
  handleCancel?: () => void;
  progress?: number;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  open,
  topic,
  text,
  handleOk,
  handleCancel,
  progress,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (open && !isOpen) setIsOpen(true);
  else if (!open && isOpen) setIsOpen(false);

  return (
    <Modal isOpen={isOpen}>
      <BackDrop>
        <FloatingContainer>
          <Container>
            <Topic>{topic || <>Confirmation</>}</Topic>
            <Content>
              {text}
              {progress}
            </Content>
            <ButtonArea>
              {handleCancel && <WhiteButton onClick={handleCancel}>Cancel</WhiteButton>}
              {handleOk && <Button onClick={handleOk}>OK</Button>}
            </ButtonArea>
          </Container>
        </FloatingContainer>
      </BackDrop>
    </Modal>
  );
};

export default Confirmation;