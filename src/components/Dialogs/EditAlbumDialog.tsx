import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues } from './EditAlbum';
import { TextInput, TextAreaInput } from './Inputs';
import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  SavingIndicator,
} from './style';

export interface Props {
  open: boolean;
  createNew: boolean;
  handleSubmit: (values: FormValues) => void;
  handleCancel: () => void;
  saving: boolean;
  message: string;
  initialValues: FormValues;
  validation: Yup.ObjectSchema<object | undefined>;
}

const EditAlbumDialog: React.FC<Props> = ({
  open,
  createNew,
  handleSubmit,
  handleCancel,
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
            <DialogTopic>
              {createNew ? <>Create a new album</> : <>Edit album</>}
            </DialogTopic>
            <DialogContent>
              <TextInput name="name" label="Name" />
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

export default EditAlbumDialog;
