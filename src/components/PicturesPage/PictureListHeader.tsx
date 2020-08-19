import React from 'react';
import { PictureListHeaderContainer } from '../PictureList/Styles';

interface PictureListHeaderProps {
  name: string;
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({ name }) => {
  return (
    <PictureListHeaderContainer>
      {name}
    </PictureListHeaderContainer>
  );
};
