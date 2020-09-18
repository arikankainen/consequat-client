import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues, Field } from './EditCustomFields';
import { TextInput, TextAreaInput } from './Inputs';
import {
  DialogContainer,
  DialogTopic,
  DialogContent,
  DialogButtonArea,
  SavingIndicator,
} from './style';

export interface EditCustomFieldsDialogProps {
  open: boolean;
  topic?: string;
  fields?: Field[];
  handleSubmit: (values: FormValues) => void;
  handleCancel: () => void;
  saving: boolean;
  message: string;
  initialValues: FormValues;
  validation: Yup.ObjectSchema<object | undefined>;
}

const EditCustomFieldsDialog: React.FC<EditCustomFieldsDialogProps> = ({
  open,
  topic,
  fields,
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
              {fields?.map(field => {
                if (field.type === 'text') {
                  return (
                    <TextInput key={field.name} name={field.name} label={field.label} />
                  );
                } else if (field.type === 'textarea') {
                  return (
                    <TextAreaInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                    />
                  );
                }
              })}
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

export default EditCustomFieldsDialog;
