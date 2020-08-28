import React from 'react';
import styled from 'styled-components';
import { Photo } from '../../utils/types';
import breakPoints from '../../utils/breakPoints';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  max-width: ${breakPoints.laptopLWidthNumber - 70}px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;

  ${breakPoints.tablet} {
    padding: 0px 5px;
    padding-bottom: 8px;
  }
`;

const Property = styled.div`
  color: #eee;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const Value = styled.div`
  margin-left: 15px;
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.4;
`;

interface BlockProps {
  name: string;
  value: string | undefined | null;
}

const Block: React.FC<BlockProps> = ({ name, value }) => {
  return (
    <>
      <Property>{name}</Property>
      <Value>{value}</Value>
    </>
  );
};

interface PictureListHeaderProps {
  photos: Photo[];
  selection: string[];
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({ photos, selection }) => {
  const selectedPhotos = photos.filter(photo => selection.includes(photo.id));
  const selectedPhoto = selectedPhotos.length === 1 ? selectedPhotos[0] : null;

  const pad = (input: number): string => {
    if (input < 10) return `0${input}`;
    return `${input}`;
  };

  const formatDate = (input: Date): string => {
    const date = new Date(Number(input));
    const customizedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const customizedTime = `${date.getHours()}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

    return `${customizedDate} ${customizedTime}`;
  };

  return (
    <Container>
      <Block
        name='Date added'
        value={selectedPhoto && selectedPhoto.dateAdded && formatDate(selectedPhoto.dateAdded)}
      />
      <Block
        name='Name'
        value={selectedPhoto?.name}
      />
      <Block
        name='Location'
        value={selectedPhoto?.location}
      />
      <Block
        name='Description'
        value={selectedPhoto?.description}
      />
    </Container>
  );
};
