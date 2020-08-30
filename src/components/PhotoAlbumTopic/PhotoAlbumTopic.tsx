import React from 'react';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import {
  Container,
  NameAndDescription,
  Name,
  Description,
  Edit,
} from './style';

interface PhotoAlbumTopicProps {
  name: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: React.FunctionComponent;
  buttonTextRequired?: boolean;
  onClick: () => void;
}

const PhotoAlbumTopic: React.FC<PhotoAlbumTopicProps> = ({
  name,
  description,
  buttonText,
  buttonIcon,
  buttonTextRequired,
  onClick,
}) => {
  return (
    <Container>
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
    </Container>
  );
};

export default PhotoAlbumTopic;
