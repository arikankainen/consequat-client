import React from 'react';
import BaseDialog from './components/BaseDialog/BaseDialog';
import Button from 'components/Button/Button';
import { ButtonColor } from 'components/Button/style';
import { ConfirmationProps } from './Confirmation';
import Spinner from 'components/Spinner/Spinner';
import * as Styled from './style';

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
  processing,
}) => {
  return (
    <BaseDialog open={open}>
      <Styled.DialogContainer data-testid="dialog-container">
        <Styled.DialogTopic>{topic || <>Confirmation</>}</Styled.DialogTopic>

        <Styled.DialogContentNormal>
          {text && <Styled.Text data-testid="dialog-text1">{text}</Styled.Text>}

          {typeof progress !== 'undefined' && (
            <Styled.ProgressContainer>
              <Styled.Progress progress={progress} data-testid="dialog-progress1" />
            </Styled.ProgressContainer>
          )}

          {text2 && <Styled.Text data-testid="dialog-text2">{text2}</Styled.Text>}

          {typeof progress2 !== 'undefined' && (
            <Styled.ProgressContainer>
              <Styled.Progress progress={progress2} data-testid="dialog-progress2" />
            </Styled.ProgressContainer>
          )}
        </Styled.DialogContentNormal>

        <Styled.DialogButtonArea>
          <Styled.SpinnerContainer>
            <Spinner show={processing} data-testid="dialog-spinner" />
          </Styled.SpinnerContainer>
          <Styled.SavingIndicator></Styled.SavingIndicator>
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
            <Button onClick={handleCancel} text="Cancel" disabled={disableCancel} width={75} />
          )}
        </Styled.DialogButtonArea>
      </Styled.DialogContainer>
    </BaseDialog>
  );
};

export default ConfirmationDialog;
