import React, { useState } from 'react';
import Button from '../Buttons/Button';
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
  const [fastSelection, setFastSelection] = useState(false);
  const [dismissDialogs, setDismissDialogs] = useState(false);
  const [expandInfo, setExpandInfo] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit', fastSelection, dismissDialogs, expandInfo);
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
            <TextSetting label="Username" value="admin" />
            <TextSetting
              label="Email"
              value="admin@mail.com"
              onClick={() => console.log('change email')}
            />
            <TextSetting
              label="Full name"
              value="Administrator"
              onClick={() => console.log('change name')}
            />
            <TextSetting
              label="Password"
              value="change password"
              onClick={() => console.log('change password')}
            />
          </Box>
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
                margin={[20, 0, 0, 0]}
              />
            </form>
          </Box>
        </BoxContainer>
      </Container>
    </OuterContainer>
  );
};

export default AccountPage;
