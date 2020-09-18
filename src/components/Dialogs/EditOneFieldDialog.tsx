import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues } from './EditOneField';
import { TextInput } from './Inputs';
import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  SavingIndicator,
} from './style';

export interface Props {
  open: boolean;
  topic?: string;
  fieldText?: string;
  handleSubmit: (values: FormValues) => void;
  handleCancel: () => void;
  saving: boolean;
  message: string;
  initialValues: FormValues;
  validation: Yup.ObjectSchema<object | undefined>;
}

const EditAlbumDialog: React.FC<Props> = ({
  open,
  topic,
  fieldText,
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
            <DialogTopic>{topic}</DialogTopic>
            <DialogContent>
              <TextInput name="field" label={fieldText || 'field'} />
            </DialogContent>
            <DialogButtonArea>
              <SavingIndicator>{message}</SavingIndicator>
              <Button
                text="Cancel"
                type="button"
                width={75}
                color={ButtonColor.whiteWithBlueBorder}
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
