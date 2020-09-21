import React from 'react';
import { Formik, Form } from 'formik';
import { Album } from '../../utils/types';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues, Errors } from './EditPhoto';
import formatDate from '../../utils/formatDate';
import {
  UncontrolledInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  CheckboxInput,
} from './Inputs';
import Spinner from '../Spinner/Spinner';

import {
  DialogContainer,
  DialogTopic,
  DialogContentGrid,
  DialogButtonArea,
  SavingIndicator,
  SpinnerContainer,
  Warning,
  Comment,
} from './style';

export interface EditPhotoDialogProps {
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

const EditPhotoDialog: React.FC<EditPhotoDialogProps> = ({
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
              <DialogContentGrid>
                {multi && (
                  <Warning>
                    Fields that are initially locked, contains unique values. By unlocking
                    those fields, you overwrite existing values for all selected photos by
                    values you enter. Only unlocked fields will be saved.
                  </Warning>
                )}
                {!multi && (
                  <UncontrolledInput label="Added" value={formatDate(dateAdded)} />
                )}
                <TextInput
                  name="name"
                  label="Name"
                  disabled={values.nameLocked}
                  onLockClick={() => setFieldValue('nameLocked', !values.nameLocked)}
                  multi={multi}
                />
                <TextInput
                  name="location"
                  label="Location"
                  disabled={values.locationLocked}
                  onLockClick={() =>
                    setFieldValue('locationLocked', !values.locationLocked)
                  }
                  multi={multi}
                />
                <SelectInput
                  name="album"
                  label="Album"
                  albums={albums}
                  disabled={values.albumLocked}
                  onLockClick={() => setFieldValue('albumLocked', !values.albumLocked)}
                  multi={multi}
                />
                <TextAreaInput
                  name="description"
                  label="Description"
                  disabled={values.descriptionLocked}
                  onLockClick={() =>
                    setFieldValue('descriptionLocked', !values.descriptionLocked)
                  }
                  multi={multi}
                />
                <TextInput
                  name="tags"
                  label="Tags"
                  disabled={values.tagsLocked}
                  onLockClick={() => setFieldValue('tagsLocked', !values.tagsLocked)}
                  multi={multi}
                />
                <div></div>
                <Comment>Separate your tags by comma</Comment>
                <CheckboxInput
                  name="hidden"
                  label="Hidden"
                  disabled={values.hiddenLocked}
                  onLockClick={() => setFieldValue('hiddenLocked', !values.hiddenLocked)}
                  multi={multi}
                />
              </DialogContentGrid>
              <DialogButtonArea>
                <SpinnerContainer>
                  <Spinner show={saving} />
                </SpinnerContainer>
                <SavingIndicator>{message}</SavingIndicator>
                <Button
                  text="Cancel"
                  type="button"
                  width={75}
                  color={ButtonColor.whiteWithBlueBorder}
                  onClick={handleCancel}
                />
                <Button
                  text={saving ? 'Saving...' : 'Save'}
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
