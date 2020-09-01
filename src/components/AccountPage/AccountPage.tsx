import React from 'react';
import TextSetting from './TextSetting';
import CheckboxSetting from './CheckboxSetting';
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
            <TextSetting name="Username" value="admin" />
            <TextSetting
              name="Email"
              value="admin@mail.com"
              onClick={() => console.log('change email')}
            />
            <TextSetting
              name="Full name"
              value="Administrator"
              onClick={() => console.log('change name')}
            />
            <TextSetting
              name="Password"
              value="change password"
              onClick={() => console.log('change password')}
            />
          </Box>
          <Box>
            <BoxTopic>Preferences</BoxTopic>
            <form>
              <CheckboxSetting
                name="Fast selection"
                description="Selecting thumbnail does not affect other selections"
              />
            </form>
          </Box>
        </BoxContainer>
      </Container>
    </OuterContainer>
  );
};

export default AccountPage;
