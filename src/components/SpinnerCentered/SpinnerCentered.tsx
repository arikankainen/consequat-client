import React from 'react';
import Spinner from 'components/Spinner/Spinner';
import * as Styled from './style';

interface SpinnerCenteredProps {
  dark?: boolean;
}

const SpinnerCentered: React.FC<SpinnerCenteredProps> = ({ dark }) => {
  if (dark) {
    return (
      <Styled.OuterContainerDark>
        <Styled.ContainerDark>
          <Spinner
            show={true}
            color="100, 100, 100"
            bgcolor="29, 29, 31"
            size={100}
            style={{ marginBottom: '20px' }}
          />
          <Styled.TopicDark>Loading...</Styled.TopicDark>
        </Styled.ContainerDark>
      </Styled.OuterContainerDark>
    );
  }

  return (
    <Styled.OuterContainer>
      <Styled.Container>
        <Spinner
          show={true}
          color="90, 90, 90"
          bgcolor="248, 248, 250"
          size={100}
          style={{ marginBottom: '20px' }}
        />
        <Styled.Topic>Loading...</Styled.Topic>
      </Styled.Container>
    </Styled.OuterContainer>
  );
};

export default SpinnerCentered;
