import React, { useState } from 'react';
import Modal from './ModalTest';
import { CSSTransition } from 'react-transition-group';
import Button, { ButtonColor } from '../Buttons/Button';
import { Photo } from '../../utils/types';

import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  ButtonArea,
  Text
} from './Styles';

export interface EditPhotoProps {
  open?: boolean;
  photo?: Photo;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditPhoto: React.FC<EditPhotoProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});

  if (props.open && !open) {
    setOpen(true);
    setSavedProps(props);
  } else if (!props.open && open) {
    setOpen(false);
  }

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
            <Topic>Edit photo</Topic>
            <Content>
              <Text>Text</Text>
            </Content>
            <ButtonArea>
              {savedProps.handleCancel &&
                <Button
                  onClick={savedProps.handleCancel}
                  text="Cancel"
                  color={ButtonColor.white}
                  width={75}
                />
              }
              {savedProps.handleOk &&
                <Button
                  onClick={savedProps.handleOk}
                  text="OK"
                  width={75}
                />
              }
            </ButtonArea>
          </Container>
        </FloatingContainer>
      </CSSTransition>
    </Modal>
  );
};

export default EditPhoto;