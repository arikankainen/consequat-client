import React from 'react';
import { OuterContainer, Container, Topic } from './style';

interface NotFoundProps {
  topic: string;
  text: string;
  Icon: React.FunctionComponent;
}

const NotFound: React.FC<NotFoundProps> = ({ topic, text, Icon }) => {
  return (
    <OuterContainer>
      <Container>
        <Icon />
        <Topic>{topic}</Topic>
        {text}
      </Container>
    </OuterContainer>
  );
};

export default NotFound;
