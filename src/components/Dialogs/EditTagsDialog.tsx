import React from 'react';
import { Formik, Form } from 'formik';
import BaseDialog from './BaseDialog/BaseDialog';
import Button from '../Button/Button';
import { ButtonColor } from '../Button/style';
import { FormValues } from './EditTags';
import Spinner from '../Spinner/Spinner';
import * as Styled from './style';

import { TextInput } from './Inputs/Inputs';

export interface EditTagsDialogProps {
  open: boolean;
  handleSubmit: (values: FormValues) => void;
  handleCancel: () => void;
  message: string;
  saving: boolean;
  initialValues: FormValues;
  multi?: boolean;
}

const EditTagsDialog: React.FC<EditTagsDialogProps> = ({
  open,
  handleSubmit,
  handleCancel,
  message,
  saving,
  initialValues,
  multi,
}) => {
  return (
    <BaseDialog open={open}>
      <Styled.DialogContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              {multi ? (
                <Styled.DialogTopic>
                  Edit tags on multiple photos
                </Styled.DialogTopic>
              ) : (
                <Styled.DialogTopic>Edit tags</Styled.DialogTopic>
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

export default EditTagsDialog;
