import React from 'react';
import { Formik, Form } from 'formik';
import { Album } from 'utils/types';
import BaseDialog from './components/BaseDialog/BaseDialog';
import Button from 'components/Button/Button';
import { ButtonColor } from 'components/Button/style';
import { FormValues, Errors } from './EditPhoto';
import formatDate from 'utils/formatDate';
import Spinner from 'components/Spinner/Spinner';
import * as Styled from './style';

import {
  UncontrolledInput,
  TextInput,
  TextAreaInput,
  SelectInput,
  CheckboxInput,
} from './components/Inputs/Inputs';

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
      <Styled.DialogContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={validation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {multi ? (
                <Styled.DialogTopic>Edit multiple photos</Styled.DialogTopic>
              ) : (
                <Styled.DialogTopic>Edit photo</Styled.DialogTopic>
              )}
              <Styled.DialogContentGrid>
                {multi && (
                  <Styled.Warning>
                    Fields that are initially locked, contains unique values. By
                    unlocking those fields, you overwrite existing values for
                    all selected photos by values you enter. Only unlocked
                    fields will be saved.
                  </Styled.Warning>
                )}
                {!multi && (
                  <UncontrolledInput
                    label="Added"
                    value={formatDate(dateAdded)}
                  />
                )}
                <TextInput
                  name="name"
                  label="Name"
                  disabled={values.nameLocked}
                  onLockClick={() =>
                    setFieldValue('nameLocked', !values.nameLocked)
                  }
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
                  onLockClick={() =>
                    setFieldValue('albumLocked', !values.albumLocked)
                  }
                  multi={multi}
                />
                <TextAreaInput
                  name="description"
                  label="Description"
                  disabled={values.descriptionLocked}
                  onLockClick={() =>
                    setFieldValue(
                      'descriptionLocked',
                      !values.descriptionLocked
                    )
                  }
                  multi={multi}
                />
                <TextInput
                  name="tags"
                  label="Tags"
                  disabled={values.tagsLocked}
                  onLockClick={() =>
                    setFieldValue('tagsLocked', !values.tagsLocked)
                  }
                  multi={multi}
                />
                <div></div>
                <Styled.Comment>Separate your tags by comma</Styled.Comment>
                <CheckboxInput
                  name="hidden"
                  label="Hide photo from public gallery"
                  disabled={values.hiddenLocked}
                  onLockClick={() =>
                    setFieldValue('hiddenLocked', !values.hiddenLocked)
                  }
                  multi={multi}
                />
              </Styled.DialogContentGrid>
              <Styled.DialogButtonArea>
                <Styled.SpinnerContainer>
                  <Spinner show={saving} />
                </Styled.SpinnerContainer>
                <Styled.SavingIndicator>{message}</Styled.SavingIndicator>
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
              </Styled.DialogButtonArea>
            </Form>
          )}
        </Formik>
      </Styled.DialogContainer>
    </BaseDialog>
  );
};

export default EditPhotoDialog;
