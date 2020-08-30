import React from 'react';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';

import {
  AlbumContainer,
  PictureListArea,
  TopicContainer,
  NameAndDescription,
  Name,
  Description,
  Edit,
} from './style';

interface PhotoAlbumProps {
  name: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: React.FunctionComponent;
  buttonTextRequired?: boolean;
  onClick: () => void;
  children: JSX.Element;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  name,
  description,
  onClick,
  buttonText,
  buttonIcon,
  buttonTextRequired,
  children,
}) => {
  return (
    <AlbumContainer>
      <TopicContainer>
        <NameAndDescription>
          <Name>{name}</Name>
          {description && <Description>{description}</Description>}
        </NameAndDescription>
        <Edit>
          <Button
            text={buttonText || 'Edit'}
            onClick={onClick}
            color={ButtonColor.white}
            icon={buttonIcon || EditButton}
            textRequired={buttonTextRequired}
          />
        </Edit>
      </TopicContainer>
      <PictureListArea>{children}</PictureListArea>
    </AlbumContainer>
  );
};

export default PhotoAlbum;
