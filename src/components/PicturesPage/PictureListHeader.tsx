import React from 'react';
import { PictureListHeaderContainer, PictureListHeaderContent } from '../PictureList/Styles';

interface PictureListHeaderProps {
  name: string;
}

export const PictureListHeader: React.FC<PictureListHeaderProps> = ({ name }) => {
  return (
    <PictureListHeaderContainer>
      <PictureListHeaderContent>
        {name}
      </PictureListHeaderContent>
    </PictureListHeaderContainer>
  );
};
