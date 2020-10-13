import React from 'react';
import Button from 'components/Button/Button';
import { ButtonColor } from 'components/Button/style';
import { ReactComponent as EditButton } from 'images/pen-solid.svg';
import { ReactComponent as DeleteButton } from 'images/trash-solid.svg';
import { ReactComponent as UploadButton } from 'images/upload-solid.svg';
import { ReactComponent as CheckButton } from 'images/check-circle-regular.svg';
import { ReactComponent as UncheckButton } from 'images/times-circle-regular.svg';
import * as Styled from './style';

interface PhotoAlbumProps {
  name: string;
  description?: string;
  isNotRealAlbum?: boolean;
  isEmpty?: boolean;
  onUploadClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onSelectClick?: () => void;
  onOutsideClick?: () => void;
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
  onOutsideClick,
  uploadButtonVisible,
  deleteButtonVisible,
  editButtonVisible,
  selectButtonVisible,
  selected,
  children,
}) => {
  const handleContainerClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((event.target as HTMLDivElement).hasAttribute('data-outside')) {
      if (onOutsideClick) onOutsideClick();
    }
  };

  if (isEmpty && isNotRealAlbum) return null;
  return (
    <Styled.AlbumContainer onClick={handleContainerClick}>
      <Styled.TopicContainer data-outside>
        <Styled.NameAndDescription data-outside>
          <Styled.Name data-outside>{name}</Styled.Name>
          {description && (
            <Styled.Description data-outside>{description}</Styled.Description>
          )}
        </Styled.NameAndDescription>
        <Styled.Edit data-outside>
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
              icon={selected ? UncheckButton : CheckButton}
              breakPoint="600px"
            />
          )}
        </Styled.Edit>
      </Styled.TopicContainer>
      <Styled.PictureListArea data-outside>
        {!isEmpty ? children : <Styled.EmptyText>No photos</Styled.EmptyText>}
      </Styled.PictureListArea>
    </Styled.AlbumContainer>
  );
};

export default PhotoAlbum;
