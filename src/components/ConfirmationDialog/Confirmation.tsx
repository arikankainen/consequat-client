import React, { useState } from 'react';
import Modal from './ModalTest';
import { CSSTransition } from 'react-transition-group';

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

const Confirmation: React.FC<ConfirmationProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<string | undefined>('');
  const [text, setText] = useState<string | undefined>('');
  const [text2, setText2] = useState<string | undefined>('');
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [progress2, setProgress2] = useState<number | undefined>(undefined);
  const [handleOk, setHandleOk] = useState<(() => void) | undefined>(undefined);
  const [handleCancel, setHandleCancel] = useState<(() => void) | undefined>(undefined);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const update = (input: any, output: any, setter: Function) => {
    if (input !== undefined && output === undefined) setter(input);
    else if (input !== undefined && output !== undefined && input.toString() !== output.toString()) setter(input);
    else if (input === undefined && output !== undefined) setter(undefined);
  };

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const updateFunction = (input: any, output: any, setter: Function) => {
    if (input && !output) setter(() => input);
    else if (input && output && input.toString() !== output.toString()) setter(() => input);
    else if (!input && output) setter(undefined);
  };

  if (props.open) {
    update(props.topic, topic, setTopic);
    update(props.text, text, setText);
    update(props.text2, text2, setText2);
    update(props.progress, progress, setProgress);
    update(props.progress2, progress2, setProgress2);

    updateFunction(props.handleOk, handleOk, setHandleOk);
    updateFunction(props.handleCancel, handleCancel, setHandleCancel);
  }

  if (props.open && !open) {
    setOpen(true);
    if (props.handleOk) setHandleOk(() => props.handleOk);
    if (props.handleCancel) setHandleCancel(() => props.handleCancel);
  }
  else if (!props.open && open) setOpen(false);

  return (
    <Modal>
      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames='backdrop'
      >
        <BackDrop />
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames='confirmation'
      >
        <FloatingContainer>
          <Container>
            <Topic>{topic || <>Confirmation</>}</Topic>
            <Content>
              {text &&
                <Text>{text}</Text>
              }

              {typeof progress !== 'undefined' &&
                <ProgressContainer>
                  <Progress progress={progress} />
                </ProgressContainer>
              }

              {text2 &&
                <Text>{text2}</Text>
              }

              {typeof progress2 !== 'undefined' &&
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
      </CSSTransition>
    </Modal>
  );
};

export default Confirmation;