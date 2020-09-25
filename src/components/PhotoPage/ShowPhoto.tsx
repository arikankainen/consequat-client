import React from 'react';
import { PhotoUserExtended } from '../../utils/types';
import formatDate from '../../utils/formatDate';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ReactComponent as LeftIcon } from '../../images/chevron-left-solid.svg';
import { ReactComponent as RightIcon } from '../../images/chevron-right-solid.svg';
import { ReactComponent as MapIcon } from '../../images/map-marker-alt-solid.svg';
import { ReactComponent as TagIcon } from '../../images/tag-solid.svg';
import { ReactComponent as CalendarIcon } from '../../images/calendar-alt-solid.svg';
import { ReactComponent as CameraIcon } from '../../images/camera-solid.svg';
import { ReactComponent as CommentIcon } from '../../images/comment-solid.svg';

import {
  GridContainer,
  PictureContainer,
  InfoContainer,
  Image,
  LeftArrow,
  RightArrow,
  AuthorContainer,
  AuthorGrid,
  AuthorGridItem,
  Author,
  Name,
  PropertyWithIcon,
  Description,
  Line,
} from './style';

interface ShowPhotoProps {
  photo: PhotoUserExtended;
  commentCount: number;
  children: JSX.Element;
}

const ShowPhoto: React.FC<ShowPhotoProps> = ({ photo, commentCount, children }) => {
  return (
    <GridContainer>
      <PictureContainer>
        <Image src={photo.mainUrl} alt={photo.name} effect="blur" />
        <LeftArrow>
          <LeftIcon />
        </LeftArrow>
        <RightArrow>
          <RightIcon />
        </RightArrow>
      </PictureContainer>
      <InfoContainer>
        <AuthorContainer>
          <AuthorGrid>
            <AuthorGridItem>
              <Author>
                <CameraIcon />
                {photo.user.fullname}
              </Author>
              <Name>{photo.name}</Name>
              <Description>{photo.description}</Description>
            </AuthorGridItem>

            <AuthorGridItem>
              <PropertyWithIcon>
                <CalendarIcon />
                {formatDate(photo.dateAdded, true)}
              </PropertyWithIcon>
              {photo.location && (
                <PropertyWithIcon>
                  <MapIcon />
                  {photo.location}
                </PropertyWithIcon>
              )}
              {photo.tags && photo.tags.join().trim() !== '' && (
                <PropertyWithIcon>
                  <TagIcon />
                  {photo.tags.join(', ').toLowerCase()}
                </PropertyWithIcon>
              )}
              <PropertyWithIcon>
                <CommentIcon />
                {commentCount} comments
              </PropertyWithIcon>
            </AuthorGridItem>
          </AuthorGrid>
        </AuthorContainer>
        <Line />
        {children}
      </InfoContainer>
    </GridContainer>
  );
};

export default ShowPhoto;
