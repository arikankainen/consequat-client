import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Album } from '../../utils/types';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues } from './EditPhoto';
import formatDate from '../../utils/formatDate';
import { UncontrolledInput, TextInput, TextAreaInput, SelectInput } from './Inputs';
import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  SavingIndicator,
} from './style';

export interface Props {
  open: boolean;
  dateAdded: Date | undefined;
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
  dateAdded,
  handleSubmit,
  handleCancel,
  albums,
  message,
  saving,
  initialValues,
  validation,
}) => {
  return (
    <BaseDialog open={open}>
      <DialogContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <DialogTopic>Edit photo</DialogTopic>
            <DialogContent>
              <UncontrolledInput label="Added" value={formatDate(dateAdded)} />
              <TextInput name="name" label="Name" />
              <TextInput name="location" label="Location" />
              <SelectInput name="album" label="Album" albums={albums} />
              <TextAreaInput name="description" label="Description" />
            </DialogContent>
            <DialogButtonArea>
              <SavingIndicator>{message}</SavingIndicator>
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
            </DialogButtonArea>
          </Form>
        </Formik>
      </DialogContainer>
    </BaseDialog>
  );
};

export default EditPhotoDialog;
