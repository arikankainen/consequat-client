import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog/BaseDialog';
import Button from '../Button/Button';
import { ButtonColor } from '../Button/style';
import { FormValues } from './EditAlbum';
import { TextInput, TextAreaInput } from './Inputs/Inputs';
import Spinner from '../Spinner/Spinner';
import * as Styled from './style';

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
      <Styled.DialogContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <Form>
            <Styled.DialogTopic>
              {createNew ? <>Create a new album</> : <>Edit album</>}
            </Styled.DialogTopic>
            <Styled.DialogContentGrid>
              <TextInput name="name" label="Name" />
              <TextAreaInput name="description" label="Description" />
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
        </Formik>
      </Styled.DialogContainer>
    </BaseDialog>
  );
};

export default EditAlbumDialog;
