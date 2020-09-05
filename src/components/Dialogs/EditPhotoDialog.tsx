import React from 'react';
import { Formik, Form } from 'formik';
import { Album } from '../../utils/types';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues, Errors } from './EditPhoto';
import formatDate from '../../utils/formatDate';
import { UncontrolledInput, TextInput, TextAreaInput, SelectInput } from './Inputs';

import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  SavingIndicator,
  Warning,
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
  validation: (values: FormValues) => Errors;
  multi?: boolean;
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
  multi,
}) => {
  return (
    <BaseDialog open={open}>
      <DialogContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={validation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {multi ? (
                <DialogTopic>Edit multiple photos</DialogTopic>
              ) : (
                <DialogTopic>Edit photo</DialogTopic>
              )}
              <DialogContent>
                {multi && (
                  <Warning>
                    Unlock each field that you want to modify. Unlocked fields will be
                    saved to all selected photos.
                  </Warning>
                )}
                <UncontrolledInput label="Added" value={formatDate(dateAdded)} />
                <TextInput
                  name="name"
                  label="Name"
                  disabled={values.nameLocked}
                  onLockClick={() => setFieldValue('nameLocked', !values.nameLocked)}
                />
                <TextInput
                  name="location"
                  label="Location"
                  disabled={values.locationLocked}
                  onLockClick={() =>
                    setFieldValue('locationLocked', !values.locationLocked)
                  }
                />
                <SelectInput
                  name="album"
                  label="Album"
                  albums={albums}
                  disabled={values.albumLocked}
                  onLockClick={() => setFieldValue('albumLocked', !values.albumLocked)}
                />
                <TextAreaInput
                  name="description"
                  label="Description"
                  disabled={values.descriptionLocked}
                  onLockClick={() =>
                    setFieldValue('descriptionLocked', !values.descriptionLocked)
                  }
                />
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
          )}
        </Formik>
      </DialogContainer>
    </BaseDialog>
  );
};

export default EditPhotoDialog;
