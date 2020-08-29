import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Album } from '../../utils/types';
import Modal from './Modal';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues } from './EditPhoto';

import { TextInput, TextAreaInput, SelectInput } from './Inputs';

import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  ButtonArea,
  SavingText,
} from './styles';

export interface Props {
  open: boolean;
  handleSubmit: (values: FormValues) => void;
  handleCancel: () => void;
  albums?: Album[];
  message: string;
  saving: boolean;
  initialValues: FormValues;
  validation: Yup.ObjectSchema<object | undefined>;
}

const EditPhotoDialog: React.FC<Props> = ({
  open,
  handleSubmit,
  handleCancel,
  albums,
  message,
  saving,
  initialValues,
  validation,
}) => {
  return (
    <Modal>
      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="backdrop"
      >
        <BackDrop />
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        mountOnEnter
        unmountOnExit
        classNames="confirmation"
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
                  <TextInput name="location" label="Location" />
                  <SelectInput name="album" label="Album" albums={albums} />
                  <TextAreaInput name="description" label="Description" />
                </Content>
                <ButtonArea>
                  <SavingText>{message}</SavingText>
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
                    disabled={saving}
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

export default EditPhotoDialog;
