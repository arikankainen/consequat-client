import React from 'react';
import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';
import { Photo } from '../../utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px;
  
  ${breakPoints.mobileXL} {
    flex-direction: column;
  }

  width: ${breakPoints.laptopWidth};

  ${breakPoints.laptop} {
    width: auto;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: hidden;
  padding: 0px 10px;

  ${breakPoints.laptop} {
    padding: 0px;
  }
`;

const Property = styled.div`
  color: #eee;
  font-size: 14px;
  font-weight: 500;
`;

const Value = styled.div`
  margin-left: 10px;
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
`;

interface PictureListHeaderProps {
  photos: Photo[];
  selection: string[];
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({ photos, selection }) => {
  const selectedPhotos = photos.filter(photo => selection.includes(photo.id));
  const selectedPhoto = selectedPhotos.length === 1 ? selectedPhotos[0] : null;

  const formatDate = (input: Date): string => {
    const date = new Date(Number(input));
    return date.toString();
  };

  return (
    <Container>
      <TextBlock>
        <Property>Name</Property>
        <Value>{selectedPhoto && selectedPhoto.name}</Value>
      </TextBlock>
      <TextBlock>
        <Property>Date added</Property>
        <Value>
          {selectedPhoto && selectedPhoto.dateAdded &&
            formatDate(selectedPhoto.dateAdded)
          }
        </Value>
      </TextBlock>
      <TextBlock>
        <Property>Description</Property>
        <Value>{selectedPhoto && selectedPhoto.description}</Value>
      </TextBlock>
    </Container>
  );
};
