import React, { useState } from 'react';
import Modal from './ModalTest';
import { CSSTransition } from 'react-transition-group';
import Button, { ButtonColor } from '../Buttons/Button';
import { Photo } from '../../utils/types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../ConfirmationDialog/Inputs';

import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  ButtonArea,
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
    setSavedProps(props);
    setOpen(true);
  } else if (!props.open && open) {
    setOpen(false);
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  interface FormValues {
    name: string;
    description: string;
  }

  const initialValues: FormValues = {
    name: '',
    description: ''
  };

  const validation = Yup.object({});

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

      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        <Form>
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
                  <TextInput name="name" label="Name" />
                  <TextInput name="description" label="Description" />
                </Content>
                <ButtonArea>
                  {savedProps.handleCancel &&
                    <Button
                      text="Cancel"
                      type="button"
                      width={75}
                      color={ButtonColor.white}
                      onClick={savedProps.handleCancel}
                    />
                  }
                  <Button
                    text="Save"
                    type="submit"
                    width={75}
                    disabled={false}
                    onClick={() => void 0}
                  />
                </ButtonArea>
              </Container>
            </FloatingContainer>
          </CSSTransition>
        </Form>
      </Formik>
    </Modal>
  );
};

export default EditPhoto;