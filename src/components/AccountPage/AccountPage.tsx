import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import * as Yup from 'yup';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import { Photo, Album } from '../../utils/types';
import TextSetting from './TextSetting';
import { ReactComponent as UsernameIcon } from '../../images/user-solid.svg';
import { ReactComponent as EmailIcon } from '../../images/at-solid.svg';
import { ReactComponent as FullnameIcon } from '../../images/signature-solid.svg';
import { ReactComponent as PasswordIcon } from '../../images/key-solid.svg';
import { ReactComponent as HiddenIcon } from '../../images/lock-solid_modified.svg';
import { ReactComponent as AlbumIcon } from '../../images/folder-solid.svg';
import { ReactComponent as NotItAlbumIcon } from '../../images/folder-open-solid.svg';
import { ReactComponent as PhotoIcon } from '../../images/camera-solid.svg';

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
  const [editCustomFields, setEditCustomFields] = useState<EditCustomFieldsProps>({});
  const loginState = useSelector((state: RootState) => state.system);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [fetched, setFetched] = useState(false);

  const resultMe = useQuery(ME, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (resultMe.data) {
      const allPhotos: Photo[] = resultMe.data.me.photos;
      const allAlbums: Album[] = resultMe.data.me.albums;

      setPhotos(allPhotos);
      setAlbums(allAlbums);
      setFetched(true);
    }
  }, [resultMe.data]);

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
          <Box>
            <BoxTopic>Statistics</BoxTopic>
            <TextSetting
              label="Uploaded photos"
              value={(fetched && String(photos.length)) || '...'}
              Icon={PhotoIcon}
            />
            <TextSetting
              label="Photos not in any albums"
              value={
                (fetched &&
                  String(photos.filter(photo => photo.album === null).length)) ||
                '...'
              }
              Icon={NotItAlbumIcon}
            />
            <TextSetting
              label="Hidden photos"
              value={
                (fetched &&
                  String(photos.filter(photo => photo.hidden === true).length)) ||
                '...'
              }
              Icon={HiddenIcon}
            />
            <TextSetting
              label="Photo albums"
              value={(fetched && String(albums.length)) || '...'}
              Icon={AlbumIcon}
            />
          </Box>
        </BoxContainer>
      </Container>
    </>
  );
};

export default AccountPage;
