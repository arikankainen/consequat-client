import React from 'react';
import * as Styled from './style';

interface NotFoundProps {
  topic: string;
  text: string;
  Icon: React.FunctionComponent;
}

const NotFound: React.FC<NotFoundProps> = ({ topic, text, Icon }) => {
  return (
    <Styled.OuterContainer>
      <Styled.Container>
        <Icon />
        <Styled.Topic>{topic}</Styled.Topic>
        {text}
      </Styled.Container>
    </Styled.OuterContainer>
  );
};

export default NotFound;
