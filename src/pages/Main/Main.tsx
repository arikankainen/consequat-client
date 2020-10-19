import React from 'react';
import * as Styled from './style';
import consequatImage from 'images/consequat.png';
import HeaderSearch from 'components/Header/components/HeaderSearch/HeaderSearch';
import TopTags from './components/TopTags/TopTags';

const Main = () => {
  return (
    <>
      <Styled.ImageContainer>
        <Styled.ConsequatImage src={consequatImage} />
      </Styled.ImageContainer>
      <Styled.Container>
        <Styled.H1>Search photos</Styled.H1>
        <HeaderSearch useInPage={true} />
        <Styled.Suggested>
          <Styled.Strong>Search tip: </Styled.Strong>
          After you have performed the search, you can refine the search options by using the{' '}
          <Styled.Strong>Search options</Styled.Strong> button.
        </Styled.Suggested>
        <Styled.H1>Top 10 tags</Styled.H1>
        <TopTags />
      </Styled.Container>
    </>
  );
};

export default Main;
