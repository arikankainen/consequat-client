import React from 'react';
import styled from 'styled-components';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0px;
  background-color: #fff;
`;

const NameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #111;
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
`;

interface PhotoAlbumProps {
  name: string;
  description?: string;
  onClick: () => void;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({ name, description, onClick }) => {
  return (
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};

export default PhotoAlbum;