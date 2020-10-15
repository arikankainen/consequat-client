import React from 'react';
import * as Styled from './style';
import consequatImage from 'images/consequat.png';
import HeaderSearch from 'components/Header/components/HeaderSearch/HeaderSearch';
import getSearchString from 'utils/getSearchString';
import TopTags from './components/TopTags/TopTags';

const Main = () => {
  const tags = ['kissa', 'koira', 'meri', 'majakka', 'joutsa'];
  return (
    <>
      <Styled.ImageContainer>
        <Styled.ConsequatImage src={consequatImage} />
      </Styled.ImageContainer>
      <Styled.Container>
        <Styled.H1>Search photos</Styled.H1>
        <HeaderSearch useInPage={true} />
        <Styled.Suggested>
          <Styled.Strong>Suggested tags: </Styled.Strong>
          {tags.map((tag, index) => (
            <span key={tag}>
              <Styled.TagLink to={getSearchString({ search: tag, tags: true })}>
                {tag}
              </Styled.TagLink>
              {index < tags.length - 1 && <>, </>}
            </span>
          ))}
        </Styled.Suggested>
        <Styled.H1>Top #10 tags</Styled.H1>
        <TopTags />
      </Styled.Container>
    </>
  );
};

export default Main;
