import React, { useState, useEffect } from 'react';
import Modal from './ModalTest';
import { CSSTransition } from 'react-transition-group';
import Button, { ButtonColor } from '../Buttons/Button';
import { Photo, Album } from '../../utils/types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput, TextAreaInput, Select } from '../ConfirmationDialog/Inputs';
import { EDIT_PHOTO } from '../../utils/queries';
import { useMutation } from '@apollo/client';

import {
  BackDrop,
  FloatingContainer,
  Container,
  Topic,
  Content,
  ButtonArea,
  SavingText
} from './Styles';

export interface EditPhotoProps {
  open?: boolean;
  photo?: Photo;
  albums?: Album[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

interface FormValues {
  name: string;
  location: string;
  album: string;
  description: string;
}

const initialValues: FormValues = {
  name: '',
  location: '',
  album: '',
  description: ''
};

const validation = Yup.object({});

const EditPhoto: React.FC<EditPhotoProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditPhotoProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [editPhoto, editPhotoResponse] = useMutation(EDIT_PHOTO, {
    onError: (error) => {
      console.log(error);
    }
  });

  if (props.open && !open) {
    setSavedProps(props);
    setOpen(true);
    setSaving(false);
  } else if (!props.open && open) {
    setOpen(false);
  }

  if (props.photo) {
    initialValues.name = props.photo.name ? props.photo.name : '';
    initialValues.location = props.photo.location ? props.photo.location : '';
    initialValues.description = props.photo.description ? props.photo.description : '';

    if (props.albums && props.photo.album) {
      const albumId = props.photo.album.id;
      const album = props.albums.find(album => album.id === albumId);
      initialValues.album = album?.name || '';
    }
  }

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setMessage('Saving...');
    setSaving(true);

    if (props.photo) {
      editPhoto({
        variables: {
          name: values.name,
          location: values.location,
          album: values.album,
          description: values.description,
          id: props.photo.id
        }
      });
    }
  };

  useEffect(() => {
    if (editPhotoResponse.data && !editPhotoResponse.error) {
      setTimeout(() => {
        setMessage('');
        handleCancel();
      }, 300);
    } else if (editPhotoResponse.error) {
      console.log(editPhotoResponse);

      setSaving(false);
      setMessage('Error!');
    }
  }, [editPhotoResponse.data, editPhotoResponse.error]); // eslint-disable-line

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
                  <TextInput name="location" label="Location" />
                  <Select name="album" label="Album" albums={props.albums} />
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

export default EditPhoto;