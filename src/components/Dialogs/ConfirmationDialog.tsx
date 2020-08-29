import React from 'react';
import Modal from './Modal';
import Button, { ButtonColor } from '../Buttons/Button';
import { ConfirmationProps } from './Confirmation';

import {
  Container,
  Topic,
  Content,
  ButtonArea,
  ProgressContainer,
  Progress,
  Text,
} from './styles';

const ConfirmationDialog: React.FC<ConfirmationProps> = ({
  open,
  topic,
  text,
  text2,
  progress,
  progress2,
  disableOk,
  disableCancel,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal open={open}>
      <Container>
        <Topic>{topic || <>Confirmation</>}</Topic>

        <Content>
          {text && <Text>{text}</Text>}

          {typeof progress !== 'undefined' && (
            <ProgressContainer>
              <Progress progress={progress} />
            </ProgressContainer>
          )}

          {text2 && <Text>{text2}</Text>}

          {typeof progress2 !== 'undefined' && (
            <ProgressContainer>
              <Progress progress={progress2} />
            </ProgressContainer>
          )}
        </Content>

        <ButtonArea>
          {handleCancel && handleOk && (
            <>
              <Button
                onClick={handleCancel}
                text="Cancel"
                disabled={disableCancel}
                color={ButtonColor.white}
                width={75}
              />
              <Button
                onClick={handleOk}
                text="OK"
                disabled={disableOk}
                width={75}
              />
            </>
          )}

          {!handleCancel && handleOk && (
            <Button
              onClick={handleOk}
              text="OK"
              disabled={disableOk}
              width={75}
            />
          )}

          {handleCancel && !handleOk && (
            <Button
              onClick={handleCancel}
              text="Cancel"
              disabled={disableCancel}
              width={75}
            />
          )}
        </ButtonArea>
      </Container>
    </Modal>
  );
};

export default ConfirmationDialog;
