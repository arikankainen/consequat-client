import React from 'react';
import { OuterContainer, Container, Topic } from './style';
import Spinner from './Spinner';

const CenteredSpinner = () => {
  return (
    <OuterContainer>
      <Container>
        <Spinner
          show={true}
          color="90, 90, 90"
          bgcolor="248, 248, 250"
          size={100}
          style={{ marginBottom: '20px' }}
        />
        <Topic>Loading...</Topic>
      </Container>
    </OuterContainer>
  );
};

export default CenteredSpinner;
