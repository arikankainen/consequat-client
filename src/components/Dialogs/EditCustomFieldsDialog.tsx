import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog';
import Button, { ButtonColor } from '../Buttons/Button';
import { FormValues, Field } from './EditCustomFields';
import { TextInput, TextAreaInput, PasswordInput } from './Inputs';
import Spinner from '../Spinner/Spinner';

import {
  DialogContainer,
  DialogTopic,
  DialogContentGrid,
  DialogButtonArea,
  SavingIndicator,
  SpinnerContainer,
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

const EditCustomFieldsDialog: React.FC<EditCustomFieldsDialogProps> = props => {
  return (
    <BaseDialog open={props.open}>
      <DialogContainer>
        <Formik
          initialValues={props.initialValues}
          enableReinitialize={true}
          validationSchema={props.validation}
          onSubmit={props.handleSubmit}
        >
          <Form>
            <DialogTopic>{props.topic}</DialogTopic>
            <DialogContentGrid>
              {props.fields?.map(field => {
                if (field.type === 'text') {
                  return (
                    <TextInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      separator={field.separator}
                    />
                  );
                }

                if (field.type === 'textarea') {
                  return (
                    <TextAreaInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      separator={field.separator}
                    />
                  );
                }

                if (field.type === 'password') {
                  return (
                    <PasswordInput
                      key={field.name}
                      name={field.name}
                      label={field.label}
                      separator={field.separator}
                    />
                  );
                }
              })}
            </DialogContentGrid>
            <DialogButtonArea>
              <SpinnerContainer>
                <Spinner show={props.saving} />
              </SpinnerContainer>
              <SavingIndicator>{props.message}</SavingIndicator>
              <Button
                text="Cancel"
                type="button"
                width={75}
                color={ButtonColor.whiteWithBlueBorder}
                onClick={props.handleCancel}
              />
              <Button
                text={props.saving ? 'Saving...' : 'Save'}
                type="submit"
                width={75}
                disabled={props.saving}
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
