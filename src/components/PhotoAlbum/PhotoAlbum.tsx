import React from 'react';
import Button, { ButtonColor } from '../Buttons/Button';
import { ReactComponent as EditButton } from '../../images/button_edit.svg';
import { ReactComponent as DeleteButton } from '../../images/button_delete.svg';
import { ReactComponent as UploadButton } from '../../images/button_upload.svg';
import { ReactComponent as CheckButton } from '../../images/button_check.svg';
import { ReactComponent as UncheckButton } from '../../images/button_uncheck.svg';

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
  isNotRealAlbum?: boolean;
  isEmpty?: boolean;
  onUploadClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onSelectClick?: () => void;
  uploadButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  editButtonVisible?: boolean;
  selectButtonVisible?: boolean;
  selected?: boolean;
  children: JSX.Element;
}

const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  name,
  description,
  isNotRealAlbum,
  isEmpty,
  onUploadClick,
  onEditClick,
  onDeleteClick,
  onSelectClick,
  uploadButtonVisible,
  deleteButtonVisible,
  editButtonVisible,
  selectButtonVisible,
  selected,
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
              color={ButtonColor.whiteWithBlueBorder}
              icon={UploadButton}
              breakPoint="290px"
            />
          )}
          {editButtonVisible && (
            <Button
              text="Edit"
              onClick={onEditClick || (() => void 0)}
              color={ButtonColor.whiteWithBlueBorder}
              icon={EditButton}
              breakPoint="400px"
            />
          )}
          {deleteButtonVisible && (
            <Button
              text="Delete"
              onClick={onDeleteClick || (() => void 0)}
              color={ButtonColor.whiteWithBlueBorder}
              icon={DeleteButton}
              breakPoint="400px"
            />
          )}
          {selectButtonVisible && (
            <Button
              onClick={onSelectClick || (() => void 0)}
              color={ButtonColor.whiteWithBlueBorder}
              icon={selected ? CheckButton : UncheckButton}
              breakPoint="600px"
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
