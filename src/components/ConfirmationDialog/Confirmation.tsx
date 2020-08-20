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
  ButtonArea,
  ProgressContainer,
  Progress,
  Text
} from './Styles';

export interface ConfirmationProps {
  open?: boolean;
  topic?: string;
  text?: string;
  text2?: string;
  progress?: number;
  progress2?: number;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  open,
  topic,
  text,
  text2,
  progress,
  progress2,
  handleOk,
  handleCancel,
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

              {text &&
                <Text>{text}</Text>
              }

              {progress &&
                <ProgressContainer>
                  <Progress progress={progress} />
                </ProgressContainer>
              }

              {text2 &&
                <Text>{text2}</Text>
              }

              {progress2 &&
                <ProgressContainer>
                  <Progress progress={progress2} />
                </ProgressContainer>
              }
            </Content>

            <ButtonArea>

              {handleCancel && handleOk &&
                <>
                  <WhiteButton onClick={handleCancel}>Cancel</WhiteButton>
                  <Button onClick={handleOk}>OK</Button>
                </>
              }

              {!handleCancel && handleOk &&
                <Button onClick={handleOk}>OK</Button>
              }

              {handleCancel && !handleOk &&
                <Button onClick={handleCancel}>Cancel</Button>
              }

            </ButtonArea>
          </Container>
        </FloatingContainer>
      </BackDrop>
    </Modal>
  );
};

export default Confirmation;