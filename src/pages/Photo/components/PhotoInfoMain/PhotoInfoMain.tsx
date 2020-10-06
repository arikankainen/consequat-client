import React from 'react';
import { ReactComponent as CameraIcon } from 'images/camera-solid.svg';
import * as Styled from './style';

interface PhotoInfoMainProps {
  user: string;
  name: string;
  description: string;
}

const PhotoInfoMain: React.FC<PhotoInfoMainProps> = ({
  user,
  name,
  description,
}) => {
  return (
    <>
      <Styled.Author>
        <CameraIcon />
        {user}
      </Styled.Author>
      <Styled.Name>{name}</Styled.Name>
      <Styled.Description>{description}</Styled.Description>
    </>
  );
};

export default PhotoInfoMain;
