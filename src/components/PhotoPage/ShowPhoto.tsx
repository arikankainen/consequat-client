import React from 'react';
import { Photo } from '../../utils/types';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ReactComponent as LeftIcon } from '../../images/chevron-left-solid.svg';
import { ReactComponent as RightIcon } from '../../images/chevron-right-solid.svg';

import {
  GridContainer,
  PictureContainer,
  InfoContainer,
  Image,
  LeftArrow,
  RightArrow,
  Author,
} from './style';

interface ShowPhotoProps {
  photo: Photo;
  children: JSX.Element;
}

const ShowPhoto: React.FC<ShowPhotoProps> = ({ photo, children }) => {
  return (
    <GridContainer>
      <PictureContainer>
        <LeftArrow>
          <LeftIcon />
        </LeftArrow>
        {/*<Image src={photo.mainUrl} alt={photo.name} effect="blur" />*/}
        <RightArrow>
          <RightIcon />
        </RightArrow>
      </PictureContainer>
      <InfoContainer>
        <Author>author</Author>
        {children}
      </InfoContainer>
    </GridContainer>
  );
};

export default ShowPhoto;
