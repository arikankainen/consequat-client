import React from 'react';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { ConfirmationProps } from './Confirmation';

import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  ProgressContainer,
  Progress,
  Text,
} from './style';

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
    <BaseDialog open={open}>
      <DialogContainer>
        <DialogTopic>{topic || <>Confirmation</>}</DialogTopic>

        <DialogContent>
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
        </DialogContent>

        <DialogButtonArea>
          {handleCancel && handleOk && (
            <>
              <Button
                onClick={handleCancel}
                text="Cancel"
                disabled={disableCancel}
                color={ButtonColor.whiteWithBlueBorder}
                width={75}
              />
              <Button onClick={handleOk} text="OK" disabled={disableOk} width={75} />
            </>
          )}

          {!handleCancel && handleOk && (
            <Button onClick={handleOk} text="OK" disabled={disableOk} width={75} />
          )}

          {handleCancel && !handleOk && (
            <Button
              onClick={handleCancel}
              text="Cancel"
              disabled={disableCancel}
              width={75}
            />
          )}
        </DialogButtonArea>
      </DialogContainer>
    </BaseDialog>
  );
};

export default ConfirmationDialog;
