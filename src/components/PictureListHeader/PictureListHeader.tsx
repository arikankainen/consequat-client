import React from 'react';
import { Photo } from '../../utils/types';
import { Property, Value, Container } from './style';

interface InfoBlockProps {
  name: string;
  value: string | undefined | null;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ name, value }) => {
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

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({
  photos,
  selection,
}) => {
  const selectedPhotos = photos.filter((photo) => selection.includes(photo.id));
  const selectedPhoto = selectedPhotos.length === 1 ? selectedPhotos[0] : null;

  const pad = (input: number): string => {
    if (input < 10) return `0${input}`;
    return `${input}`;
  };

  const formatDate = (input: Date): string => {
    const date = new Date(Number(input));
    const customizedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    const customizedTime = `${date.getHours()}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;

    return `${customizedDate} ${customizedTime}`;
  };

  return (
    <Container>
      <InfoBlock
        name="Date added"
        value={
          selectedPhoto &&
          selectedPhoto.dateAdded &&
          formatDate(selectedPhoto.dateAdded)
        }
      />
      <InfoBlock name="Name" value={selectedPhoto?.name} />
      <InfoBlock name="Location" value={selectedPhoto?.location} />
      <InfoBlock name="Description" value={selectedPhoto?.description} />
    </Container>
  );
};
