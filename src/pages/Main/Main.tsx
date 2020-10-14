import React from 'react';
import * as Styled from './style';
import consequatImage from 'images/consequat.png';
import HeaderSearch from 'components/Header/components/HeaderSearch/HeaderSearch';
import getSearchString from 'utils/getSearchString';

const Main = () => {
  const tags = ['kissa', 'koira', 'meri', 'majakka', 'joutsa'];

  return (
    <>
      <Styled.ImageContainer>
        <Styled.ConsequatImage src={consequatImage} />
      </Styled.ImageContainer>
      <Styled.Container>
        <Styled.SearchContainer>
          <Styled.H1>Search photos</Styled.H1>
          {/* <Styled.P>
            Photos can have several information fields: <Styled.Strong>name</Styled.Strong>,{' '}
            <Styled.Strong>location</Styled.Strong>, <Styled.Strong>description</Styled.Strong> and{' '}
            <Styled.Strong>tags</Styled.Strong>. By default, search will include all the fields, but
            you can also specify what fields will be included by clicking the{' '}
            <Styled.Strong>Search options</Styled.Strong> button after you have performed the
            search.
          </Styled.P> */}
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
        </Styled.SearchContainer>
      </Styled.Container>
    </>
  );
};

export default Main;
