import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import breakPoints from '../../utils/breakPoints';

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 10px;
`;

export const Text = styled.div`
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 14px;
  color: #222;
  line-height: 1;
  padding-top: 6px;
`;

export const TopicContainer = styled.div`
  width: 100%;
  padding: 20px 20px 20px 20px;
  max-width: ${breakPoints.laptopLWidth};
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 20px;
  color: #222;
  line-height: 1;
  text-align: center;
`;

export const Keyword = styled.span`
  display: inline;
  font-family: inherit;
  font-weight: 400;
`;

export const GridContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  margin-bottom: 7px;
`;

export const ItemOuterContainer = styled.div`
  position: absolute;
`;

export const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #eee;

  &:hover {
    & > a > div:last-child {
      opacity: 1;
    }
  }

  & > a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  & > span {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

export const Image = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  transition: 0.3s ease-in-out;
  pointer-events: none;
`;

export const InfoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  left: 0;
  padding: 5px;
  width: 100%;
  overflow: hidden;
  height: 70px;
  pointer-events: none;
  opacity: 0;
  transition: 0.3s ease-in-out;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, .1) 20%,
    rgba(0, 0, 0, .3) 80%,
    rgba(0, 0, 0, .4) 100%
  );
`;

const InfoBase = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
  line-height: 1;
  max-width: 100%;
`;

export const InfoName = styled(InfoBase)`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

export const InfoUser = styled(InfoBase)`
  color: #eee;
  margin-top: 5px;
  font-size: 10px;
  font-weight: 400;
`;

export const Loading = styled.div`
  margin: 20px;
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 24px;
  color: #000;
`;