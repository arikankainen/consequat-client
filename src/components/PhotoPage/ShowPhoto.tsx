import React from 'react';
import { PhotoUserExtended } from '../../utils/types';
import formatDate from '../../utils/formatDate';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ReactComponent as LeftIcon } from '../../images/chevron-left-solid.svg';
import { ReactComponent as RightIcon } from '../../images/chevron-right-solid.svg';
import { ReactComponent as MapIcon } from '../../images/map-marker-alt-solid.svg';
import { ReactComponent as TagIcon } from '../../images/tag-solid.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar-alt-solid.svg';

import {
  GridContainer,
  PictureContainer,
  InfoContainer,
  //Image,
  LeftArrow,
  RightArrow,
  AuthorContainer,
  AuthorGrid,
  AuthorGridItem,
  Author,
  Name,
  PropertyWithIcon,
  Description,
} from './style';

interface ShowPhotoProps {
  photo: PhotoUserExtended;
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
        <AuthorContainer>
          <AuthorGrid>
            <AuthorGridItem>
              <Author>{photo.user.fullname}</Author>
              <Name>{photo.name}</Name>
              <Description>{photo.description}</Description>
            </AuthorGridItem>

            <AuthorGridItem>
              {photo.location && (
                <PropertyWithIcon>
                  <MapIcon />
                  {photo.location}
                </PropertyWithIcon>
              )}
              <PropertyWithIcon>
                <CalendarIcon />
                {formatDate(photo.dateAdded, true)}
              </PropertyWithIcon>
              {photo.tags && photo.tags.join().trim() !== '' && (
                <PropertyWithIcon>
                  <TagIcon />
                  {photo.tags.join(', ').toLowerCase()}
                </PropertyWithIcon>
              )}
            </AuthorGridItem>
          </AuthorGrid>
        </AuthorContainer>
        {children}
      </InfoContainer>
    </GridContainer>
  );
};

export default ShowPhoto;
