import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import * as Yup from 'yup';
import Button from '../Buttons/Button';
import TextSetting from './TextSetting';
import CheckboxSetting from './CheckboxSetting';
import { ReactComponent as UsernameIcon } from '../../images/account_username.svg';
import { ReactComponent as EmailIcon } from '../../images/account_email.svg';
import { ReactComponent as FullnameIcon } from '../../images/account_fullname.svg';
import { ReactComponent as PasswordIcon } from '../../images/account_password.svg';
import EditCustomFields, {
  EditCustomFieldsProps,
  Field,
} from '../Dialogs/EditCustomFields';

import {
  TopicAreaContainer,
  TopicArea,
  Container,
  Topic,
  SubTopic,
  Box,
  BoxTopic,
  BoxContainer,
} from './style';

const AccountPage = () => {
  const [fastSelection, setFastSelection] = useState(false);
  const [dismissDialogs, setDismissDialogs] = useState(false);
  const [expandInfo, setExpandInfo] = useState(false);
  const [editCustomFields, setEditCustomFields] = useState<EditCustomFieldsProps>({});
  const loginState = useSelector((state: RootState) => state.system);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit', fastSelection, dismissDialogs, expandInfo);
  };

  const handleEmailChange = () => {
    const fields: Field[] = [
      {
        type: 'text',
        name: 'email',
        label: 'Email',
        initialValue: loginState.loggedUser?.email,
        validation: Yup.string()
          .email('Must be valid email')
          .required('Email cannot be empty'),
      },
    ];

    setEditCustomFields({
      open: true,
      topic: 'Update your email address',
      fields,
      handleOk: () => void 0,
      handleCancel: () => setEditCustomFields({}),
    });
  };

  const handlePasswordChange = () => {
    const fields: Field[] = [
      {
        type: 'password',
        name: 'oldPassword',
        label: 'Old password',
        initialValue: '',
        validation: Yup.string()
          .min(5, 'Must be at least 5 characters')
          .required('Required'),
      },
      {
        separator: true,
        type: 'password',
        name: 'newPassword',
        label: 'New password',
        initialValue: '',
        validation: Yup.string()
          .min(5, 'Must be at least 5 characters')
          .required('Required'),
      },
      {
        type: 'password',
        name: 'confirmPassword',
        label: 'Confirm',
        initialValue: '',
        validation: Yup.string().oneOf(
          [Yup.ref('newPassword'), ''],
          'Passwords must match'
        ),
      },
    ];
    setEditCustomFields({
      open: true,
      topic: 'Change your password',
      fields,
      handleOk: () => void 0,
      handleCancel: () => setEditCustomFields({}),
    });
  };

  return (
    <>
      <EditCustomFields {...editCustomFields} />
      <TopicAreaContainer>
        <TopicArea>
          <Topic>Account settings</Topic>
          <SubTopic>View and change settings related to your account</SubTopic>
        </TopicArea>
      </TopicAreaContainer>

      <Container>
        <BoxContainer>
          <Box>
            <BoxTopic>Personal information</BoxTopic>
            <TextSetting
              label="Username"
              value={loginState.loggedUser?.username || '...'}
              Icon={UsernameIcon}
            />
            <TextSetting
              label="Full name"
              value={loginState.loggedUser?.fullname || '...'}
              Icon={FullnameIcon}
            />
            <TextSetting
              label="Email"
              value={loginState.loggedUser?.email || '...'}
              Icon={EmailIcon}
              onClick={handleEmailChange}
            />
            <TextSetting
              label="Password"
              value="*****"
              Icon={PasswordIcon}
              onClick={handlePasswordChange}
            />
          </Box>
          {/*
          <Box>
            <BoxTopic>Preferences</BoxTopic>
            <form onSubmit={handleSubmit}>
              <CheckboxSetting
                name="fastSelection"
                label="Fast selection"
                description="Clicking thumbnail does not deselect other thumbnails"
                checked={fastSelection}
                onChange={() => setFastSelection(!fastSelection)}
              />
              <CheckboxSetting
                name="dismissDialogs"
                label="Dismiss dialogs"
                description="Automatically dismiss success dialogs after upload or delete operation"
                checked={dismissDialogs}
                onChange={() => setDismissDialogs(!dismissDialogs)}
              />
              <CheckboxSetting
                name="expandInfo"
                label="Expand photo info"
                description="Automatically expand additional fields in photo info panel"
                checked={expandInfo}
                onChange={() => setExpandInfo(!expandInfo)}
              />
              <Button
                text="Save"
                type="submit"
                onClick={() => void 0}
                margin={[30, 0, 0, 0]}
              />
            </form>
          </Box>
          */}
        </BoxContainer>
      </Container>
    </>
  );
};

export default AccountPage;
