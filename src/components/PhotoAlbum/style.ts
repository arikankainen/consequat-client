import styled, { css } from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

interface CollapseProps {
  collapsed: boolean;
}

export const AlbumContainer = styled.div<CollapseProps>`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: var(--default-box-shadow);

  margin-top: 20px;
  margin-bottom: 20px;
  
  ${props =>
    props.collapsed &&
    css`
      margin-top: 5px;
      margin-bottom: 5px;
  `}

  transition: margin .3s ease;

  &:first-child {
    margin-top: 0px;
  }

  &:last-child {
    margin-bottom: 20px;
  }
`;

export const TopicContainer = styled.div<CollapseProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;

  ${breakPoints.tablet} {
    padding-top: 15px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 5px;
  }

  ${props =>
    props.collapsed &&
    css`
      padding-top: 10px;
      padding-bottom: 10px;

      ${breakPoints.tablet} {
        padding-top: 10px;
        padding-bottom: 10px;
      }
  `}

  transition: padding .3s ease;
`;

export const NameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 24px;
  color: #222;
  line-height: 1;

  ${breakPoints.mobileM} {
    font-size: 20px;
  }

  & > svg {
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    color: #555;
    margin-right: 5px;
    cursor: pointer;
  }

  &:hover {
    & > svg {
      color: #000;
    }
  }
`;

export const Description = styled.div<CollapseProps>`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #222;
  line-height: 1;
  max-height: 300px;

  ${props =>
    props.collapsed &&
    css`
      padding-top: 0;
      padding-bottom: 0;
      opacity: 0;
      max-height: 0;
      overflow: hidden;
  `}

  transition: max-height .05s ease, opacity .5s ease;
`;

export const Edit = styled.div<CollapseProps>`
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin: 0px;
  opacity: 1;

  ${props =>
    props.collapsed &&
    css`
      padding-top: 0;
      padding-bottom: 0;
      display: none;
      opacity: 0;
  `}

  transition: opacity 3s ease;
`;

export const Stats = styled.div<CollapseProps>`
  align-items: center;
  display: none;
  opacity: 0;
  margin-right: 5px;
  color: #888;
  white-space: nowrap;

  ${props =>
    props.collapsed &&
    css`
      display: flex;
      opacity: 1;
  `}

  transition: opacity 3s ease;
`;

export const PictureListArea = styled.div<CollapseProps>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 5px;
  width: 100%;
  padding: 0px;
  background-color: #fff;
  padding: 20px;

  ${breakPoints.tablet} {
    padding: 5px;
  }

  ${props =>
    props.collapsed &&
    css`
      max-height: 0;
      opacity: 0;
      padding-top: 0;
      padding-bottom: 0;
      overflow: hidden;

      ${breakPoints.tablet} {
        padding-top: 0;
        padding-bottom: 0;
      }
  `}

  transition: opacity .5s ease, padding .3s ease;
`;

export const EmptyText = styled.div`
  color: #999;

  ${breakPoints.tablet} {
    padding: 5px;
  }
`;
