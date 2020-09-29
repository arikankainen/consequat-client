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
import Tag from '../Tag/Tag';

import * as Style from './style';

interface ShowPhotoProps {
  photo: PhotoUserExtended;
  commentCount: number;
  children: JSX.Element;
}

const ShowPhoto: React.FC<ShowPhotoProps> = ({
  photo,
  commentCount,
  children,
}) => {
  return (
    <Style.GridContainer>
      <Style.PictureContainer>
        <Style.Image src={photo.mainUrl} alt={photo.name} effect="blur" />
        <Style.LeftArrow>
          <LeftIcon />
        </Style.LeftArrow>

        <Style.RightArrow>
          <RightIcon />
        </Style.RightArrow>
      </Style.PictureContainer>

      <Style.InfoContainer>
        <Style.AuthorContainer>
          <Style.AuthorGrid>
            <Style.AuthorGridItem>
              <Style.Author>
                <CameraIcon />
                {photo.user.fullname}
              </Style.Author>
              <Style.Name>{photo.name}</Style.Name>
              <Style.Description>{photo.description}</Style.Description>
            </Style.AuthorGridItem>

            <Style.AuthorGridItem>
              <Style.PropertyWithIcon>
                <CalendarIcon />
                {formatDate(photo.dateAdded, true)}
              </Style.PropertyWithIcon>

              {photo.location && (
                <Style.PropertyWithIcon>
                  <MapIcon />
                  {photo.location}
                </Style.PropertyWithIcon>
              )}

              {photo.tags && photo.tags.join().trim() !== '' && (
                <Style.PropertyWithIcon>
                  <TagIcon />
                  {photo.tags.map(tag => (
                    <Tag key={tag} tag={tag} />
                  ))}
                </Style.PropertyWithIcon>
              )}

              <Style.PropertyWithIcon>
                <CommentIcon />
                {commentCount} comments
              </Style.PropertyWithIcon>
            </Style.AuthorGridItem>
          </Style.AuthorGrid>
        </Style.AuthorContainer>
        <Style.Line />
        {children}
      </Style.InfoContainer>
    </Style.GridContainer>
  );
};

export default ShowPhoto;
