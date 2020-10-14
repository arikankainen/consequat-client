import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import { expandAlbum, collapseAlbum } from 'reducers/myPhotosReducer';
import Button from 'components/Button/Button';
import { ButtonColor } from 'components/Button/style';
import { ReactComponent as EditButton } from 'images/pen-solid.svg';
import { ReactComponent as DeleteButton } from 'images/trash-solid.svg';
import { ReactComponent as UploadButton } from 'images/upload-solid.svg';
import { ReactComponent as CheckButton } from 'images/check-circle-regular.svg';
import { ReactComponent as UncheckButton } from 'images/times-circle-regular.svg';
import { ReactComponent as CollapseIcon } from 'images/chevron-down-solid_modified.svg';
import { ReactComponent as ExpandIcon } from 'images/chevron-up-solid_modified.svg';
import * as Styled from './style';

interface PhotoAlbumProps {
  name: string;
  description?: string;
  id: string;
  photoCount: number;
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
  id,
  photoCount,
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
  const myPhotosState = useSelector((state: RootState) => state.myPhotos);
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(
    myPhotosState.collapsed.includes(id)
  );

  const handleCollapse = (collapse: boolean) => {
    if (collapse) {
      setCollapsed(true);
      dispatch(collapseAlbum(id));
    } else {
      setCollapsed(false);
      dispatch(expandAlbum(id));
    }
  };

  if (isEmpty && isNotRealAlbum) return null;
  return (
    <Styled.AlbumContainer collapsed={collapsed}>
      <Styled.TopicContainer collapsed={collapsed}>
        <Styled.NameAndDescription>
          <Styled.Name>
            {collapsed ? (
              <ExpandIcon onClick={() => handleCollapse(false)} />
            ) : (
              <CollapseIcon onClick={() => handleCollapse(true)} />
            )}
            {name}
          </Styled.Name>
          {description && (
            <Styled.Description collapsed={collapsed}>
              {description}
            </Styled.Description>
          )}
        </Styled.NameAndDescription>
        <Styled.Stats collapsed={collapsed}>
          {photoCount === 0 && <>No photos</>}
          {photoCount === 1 && <>1 photo</>}
          {photoCount > 1 && <>{photoCount} photos</>}
        </Styled.Stats>
        <Styled.Edit collapsed={collapsed}>
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
      <Styled.PictureListArea collapsed={collapsed}>
        {!isEmpty ? children : <Styled.EmptyText>No photos</Styled.EmptyText>}
      </Styled.PictureListArea>
    </Styled.AlbumContainer>
  );
};

export default PhotoAlbum;
