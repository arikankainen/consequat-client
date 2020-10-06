import React from 'react';
import { PhotoUserExtended } from 'utils/types';
import PhotoInfoMain from '../PhotoInfoMain/PhotoInfoMain';
import PhotoInfoAdditional from '../PhotoInfoAdditional/PhotoInfoAdditional';
import * as Styled from './style';

interface PhotoInfoProps {
  photo: PhotoUserExtended | null;
  commentCount: number;
  children: JSX.Element;
}

const PhotoInfo: React.FC<PhotoInfoProps> = ({
  photo,
  commentCount,
  children,
}) => {
  if (!photo) {
    return <Styled.InfoContainerEmpty></Styled.InfoContainerEmpty>;
  }

  return (
    <Styled.InfoContainer>
      <Styled.AuthorContainer>
        <Styled.AuthorGrid>
          <Styled.AuthorGridItem>
            <PhotoInfoMain
              user={photo.user.fullname}
              name={photo.name}
              description={photo.description}
            />
          </Styled.AuthorGridItem>

          <Styled.AuthorGridItem>
            <PhotoInfoAdditional
              date={photo.exif.dateTimeOriginal}
              location={photo.location}
              tags={photo.tags}
              comments={commentCount}
            />
          </Styled.AuthorGridItem>
        </Styled.AuthorGrid>
      </Styled.AuthorContainer>
      <Styled.Line />
      {children}
    </Styled.InfoContainer>
  );
};

export default PhotoInfo;
