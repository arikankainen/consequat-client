import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const TopTagContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "topic topic"
    "pic1 pic2"
    "pic3 pic4";
  gap: 15px;
  padding: 20px;
  background-color: #eee;
  width: 100%;
  border-radius: 5px;
`;

export const TopicArea = styled.div`
  grid-area: topic;
  text-align: center;
`;

export const TagLink = styled(Link)`
  line-height: 1;
  font-family: var(--topic-font-family);
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 5px;
  text-decoration: none;

  &:link,
  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-1);
  }

  transition: all .2s ease-in-out;
`;

export const NumberText = styled.div`
  text-align: center;
  line-height: 1;
  font-size: 14px;
  font-weight: 400;
  color: #555;
`;

export const ThumbnailPlaceholder = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

export const ThumbnailPicture = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 5px solid #fff;
  border-radius: 5px;

  &:hover {
    filter: brightness(1.15);
  }

  transition: all .2s ease-in-out;
`;
