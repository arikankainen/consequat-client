import React from 'react';
import {
  OuterContainer,
  Container,
  TopicArea,
  Topic,
  SubTopic,
  Box,
  BoxTopic,
  BoxContainer,
  Setting,
  SettingText,
  SettingValue,
} from './style';

const AccountPage = () => {
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
            <Setting>
              <SettingText>Username</SettingText>
              <SettingValue>admin</SettingValue>
            </Setting>
            <Setting>
              <SettingText>Email</SettingText>
              <SettingValue>admin@mail.com</SettingValue>
            </Setting>
          </Box>
          <Box>
            <BoxTopic>Preferences</BoxTopic>
            <Setting>
              <SettingText>Setting</SettingText>
              <SettingValue>Value</SettingValue>
            </Setting>
          </Box>
        </BoxContainer>
      </Container>
    </OuterContainer>
  );
};

export default AccountPage;
