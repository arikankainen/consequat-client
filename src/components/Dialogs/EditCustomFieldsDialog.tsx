import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BaseDialog from './BaseDialog/BaseDialog';
import Button from '../Button/Button';
import { ButtonColor } from '../Button/style';
import { FormValues, Field } from './EditCustomFields';
import { TextInput, TextAreaInput, PasswordInput } from './Inputs/Inputs';
import Spinner from '../Spinner/Spinner';
import * as Styled from './style';

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
      <Styled.DialogContainer>
        <Formik
          initialValues={props.initialValues}
          enableReinitialize={true}
          validationSchema={props.validation}
          onSubmit={props.handleSubmit}
        >
          <Form>
            <Styled.DialogTopic>{props.topic}</Styled.DialogTopic>
            <Styled.DialogContentGrid>
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
            </Styled.DialogContentGrid>
            <Styled.DialogButtonArea>
              <Styled.SpinnerContainer>
                <Spinner show={props.saving} />
              </Styled.SpinnerContainer>
              <Styled.SavingIndicator>{props.message}</Styled.SavingIndicator>
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
            </Styled.DialogButtonArea>
          </Form>
        </Formik>
      </Styled.DialogContainer>
    </BaseDialog>
  );
};

export default EditCustomFieldsDialog;
