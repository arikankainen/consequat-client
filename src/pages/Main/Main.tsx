import React from 'react';
import * as Styled from './style';
import consequatImage from 'images/consequat.png';
import HeaderSearch from 'components/Header/components/HeaderSearch/HeaderSearch';

const Main = () => {
  return (
    <Styled.Container>
      <Styled.ConsequatImage src={consequatImage} />
      <Styled.SearchContainer>
        <HeaderSearch />
      </Styled.SearchContainer>
    </Styled.Container>
  );
};

export default Main;
