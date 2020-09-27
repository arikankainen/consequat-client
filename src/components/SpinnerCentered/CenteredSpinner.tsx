import React from 'react';
import Spinner from '../Spinner/Spinner';
import * as Styled from './style';

const CenteredSpinner = () => {
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

export default CenteredSpinner;
