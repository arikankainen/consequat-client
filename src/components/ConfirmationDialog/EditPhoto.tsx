import React, { useState } from 'react';
import Modal from './ModalTest';
import { CSSTransition } from 'react-transition-group';
import Button, { ButtonColor } from '../Buttons/Button';
import { Photo } from '../../utils/types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput } from '../ConfirmationDialog/Inputs';

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

interface FormValues {
  name: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  description: ''
};

const validation = Yup.object({});

const EditPhoto: React.FC<EditPhotoProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});

  if (props.open && !open) {
    setSavedProps(props);
    setOpen(true);
  } else if (!props.open && open) {
    setOpen(false);
  }

  if (props.photo) {
    if (props.photo.name) initialValues.name = props.photo.name;
    if (props.photo.description) initialValues.description = props.photo.description;
  }

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

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
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validation}
              onSubmit={handleSubmit}
            >
              <Form>
                <Topic>Edit photo</Topic>
                <Content>
                  <TextInput name="name" label="Name" />
                  <TextAreaInput name="description" label="Description" />
                </Content>
                <ButtonArea>
                  <Button
                    text="Cancel"
                    type="button"
                    width={75}
                    color={ButtonColor.white}
                    onClick={handleCancel}
                  />
                  <Button
                    text="Save"
                    type="submit"
                    width={75}
                    disabled={false}
                    onClick={() => void 0}
                  />
                </ButtonArea>
              </Form>
            </Formik>
          </Container>
        </FloatingContainer>
      </CSSTransition>
    </Modal>
  );
};

export default EditPhoto;