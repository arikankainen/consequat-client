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
import CenteredSpinner from '../../components/SpinnerCentered/CenteredSpinner';
import Tag from '../Tag/Tag';

import * as Style from './style';

interface ShowPhotoProps {
  photo: PhotoUserExtended | null;
  commentCount: number;
  prevPhoto: string | undefined;
  nextPhoto: string | undefined;
  children: JSX.Element;
}

const ShowPhoto: React.FC<ShowPhotoProps> = ({
  photo,
  commentCount,
  prevPhoto,
  nextPhoto,
  children,
}) => {
  if (!photo) {
    return (
      <Style.GridContainer>
        <Style.PictureContainer>
          <CenteredSpinner dark={true} />
        </Style.PictureContainer>
        <Style.InfoContainer
          style={{ height: 'calc(40vh - var(--header-height))' }}
        ></Style.InfoContainer>
      </Style.GridContainer>
    );
  }

  return (
    <Style.GridContainer>
      <Style.PictureContainer>
        <Style.Image src={photo.mainUrl} alt={photo.name} effect="blur" />

        {prevPhoto && (
          <Style.LeftArrow to={prevPhoto}>
            <LeftIcon />
          </Style.LeftArrow>
        )}

        {nextPhoto && (
          <Style.RightArrow to={nextPhoto}>
            <RightIcon />
          </Style.RightArrow>
        )}
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
                <Style.TextProperty>
                  {formatDate(photo.dateAdded, true)}
                </Style.TextProperty>
              </Style.PropertyWithIcon>

              {photo.location && (
                <Style.PropertyWithIcon>
                  <MapIcon />
                  <Style.TextProperty>{photo.location}</Style.TextProperty>
                </Style.PropertyWithIcon>
              )}

              {photo.tags && photo.tags.join().trim() !== '' && (
                <Style.PropertyWithIcon>
                  <TagIcon />
                  <Style.TextProperty>
                    {photo.tags.map(tag => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </Style.TextProperty>
                </Style.PropertyWithIcon>
              )}

              <Style.PropertyWithIcon>
                <CommentIcon />
                {commentCount === 0 && <>No comments</>}
                {commentCount === 1 && <>1 comment</>}
                {commentCount > 1 && <>{commentCount} comments</>}
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
