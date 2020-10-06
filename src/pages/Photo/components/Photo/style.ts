import styled from 'styled-components/macro';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import breakPoints from '../../../../utils/breakPoints';
import { Link } from 'react-router-dom';

export const PictureContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: var(--footer-bg-color);

  & > span {
    display: flex !important;
    justify-content: center;
    align-items: center;
    max-width: calc(100% - 80px);
    height: calc(100% - 80px);

    ${breakPoints.custom(600)} {
      max-width: 100%;
    }
  }

  ${breakPoints.custom(600)} {
    height: 60vh;
  }
`;

export const Image = styled(LazyLoadImage)`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  transition: all .2s ease-in-out;
  font-weight: 300;
  margin-top: 10px;

  &:link,
  &:visited {
    color: #aaa;
  }

  &:hover {
    color: #fff;
    
    & > svg {
      color: #fff;
    }
  }

  & > svg {
    width: 16px;
    color: #aaa;
    margin-right: 8px;
    padding-bottom: 3px;
    transition: all .2s ease-in-out;
  }
`;

const TopAction = styled(Link)`
  position: absolute;
  top: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  transition: all .2s ease-in-out;
  font-weight: 300;

  &:link,
  &:visited {
    color: #ccc;
  }

  &:hover {
    color: #fff;
    
    & > svg {
      transform: scale(1.2);
      color: #fff;
    }
  }

  & > svg {
    width: 16px;
    color: #aaa;
    margin-right: 8px;
    padding-bottom: 3px;
    transition: all .2s ease-in-out;
  }
`;

export const CenterAction = styled(TopAction)`
  left: 50%;
  transform: translateX(-50%);
`;

export const LeftAction = styled(TopAction)`
  left: 10px;
`;

export const RightAction = styled(TopAction)`
  right: 10px;
`;

const Arrow = styled(Link)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  & > svg {
    width: 16px;
    color: #aaa;

    ${breakPoints.custom(600)} {
      color: #eee;
      filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .8));
    }

    &:hover {
      transform: scale(1.2);
      color: #fff;
    }

    transition: all .2s ease-in-out;
  }

  ${breakPoints.custom(600)} {
    transform: translateY(-50%);
  }
`;

export const LeftArrow = styled(Arrow)`
  left: 10px;
`;

export const RightArrow = styled(Arrow)`
  right: 10px;
`;
