import React from 'react';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as UploadButton } from '../../images/button_upload.svg';

import {
  AlbumContainer,
  PictureListArea,
  TopicContainer,
  NameAndDescription,
  Name,
  Description,
  Edit,
  EmptyText,
} from './style';

interface PhotoAlbumProps {
  name: string;
  description?: string;
  buttonTextRequired?: boolean;
  isNotRealAlbum?: boolean;
  isEmpty?: boolean;
  onUploadClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  uploadButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  editButtonVisible?: boolean;
  children: JSX.Element;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  name,
  description,
  buttonTextRequired,
  isNotRealAlbum,
  isEmpty,
  onUploadClick,
  onEditClick,
  onDeleteClick,
  uploadButtonVisible,
  deleteButtonVisible,
  editButtonVisible,
  children,
}) => {
  if (isEmpty && isNotRealAlbum) return null;
  return (
    <AlbumContainer>
      <TopicContainer>
        <NameAndDescription>
          <Name>{name}</Name>
          {description && <Description>{description}</Description>}
        </NameAndDescription>
        <Edit>
          {uploadButtonVisible && (
            <Button
              text="Upload"
              onClick={onUploadClick || (() => void 0)}
              color={ButtonColor.white}
              icon={UploadButton}
              textRequired={buttonTextRequired}
            />
          )}
          {editButtonVisible && (
            <Button
              text="Edit"
              onClick={onEditClick || (() => void 0)}
              color={ButtonColor.white}
              icon={EditButton}
              textRequired={buttonTextRequired}
            />
          )}
          {deleteButtonVisible && (
            <Button
              text="Delete"
              onClick={onDeleteClick || (() => void 0)}
              color={ButtonColor.white}
              icon={DeleteButton}
              textRequired={buttonTextRequired}
            />
          )}
        </Edit>
      </TopicContainer>
      <PictureListArea>
        {!isEmpty ? children : <EmptyText>No photos</EmptyText>}
      </PictureListArea>
    </AlbumContainer>
  );
};

export default PhotoAlbum;
