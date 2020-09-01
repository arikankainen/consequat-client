import React from 'react';
import Setting from './Setting';
import {
  OuterContainer,
  Container,
  TopicArea,
  Topic,
  SubTopic,
  Box,
  BoxTopic,
  BoxContainer,
} from './style';

const AccountPage = () => {
  const handlePasswordClick = () => {
    console.log('passwordClick');
  };

  return (
    <OuterContainer>
      <Container>
        <TopicArea>
          <Topic>Account settings</Topic>
          <SubTopic>View and change settings related to your account</SubTopic>
        </TopicArea>

        <BoxContainer>
          <Box>
            <BoxTopic>Personal information</BoxTopic>
            <Setting name="Username" value="admin" />
            <Setting name="Email" value="admin@mail.com" />
            <Setting
              name="Password"
              value="change password"
              onClick={handlePasswordClick}
            />
          </Box>
          <Box>
            <BoxTopic>Preferences</BoxTopic>
            <Setting name="Setting" value="value" />
          </Box>
        </BoxContainer>
      </Container>
    </OuterContainer>
  );
};

export default AccountPage;
