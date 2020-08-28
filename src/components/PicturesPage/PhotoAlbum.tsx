import React from 'react';
import styled from 'styled-components';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import breakPoints from '../../utils/breakPoints';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding-top: 25px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  ${breakPoints.laptop} {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 5px;
  }

  background-color: #fff;
`;

const NameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #222;
  line-height: 1;
`;

const Description = styled.div`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #444;
  line-height: 1;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin: 0px;
`;

interface PhotoAlbumProps {
  name: string;
  description?: string;
  onClick: () => void;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ name, description, onClick }) => {
  return (
    <Container>
      <NameAndDescription>
        <Name>{name}</Name>
        {description && <Description>{description}</Description>}
      </NameAndDescription>
      <Edit>
        <Button
          text='Edit'
          onClick={onClick}
          color={ButtonColor.white}
          icon={EditButton}
        />
      </Edit>
    </Container>
  );
};

export default PhotoAlbum;