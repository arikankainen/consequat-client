import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { setError } from '../../reducers/notificationReducer';
import { updateSelected, removePicture } from '../../reducers/pictureReducer';
import resizeImage from '../../utils/resizeImage';

import { ReactComponent as CheckedIcon } from '../../images/icon_checked.svg';
import placeholder from '../../images/placeholder.png';

import {
  ThumbnailContainer,
  ThumbnailPicture,
  ThumbnailIconArea,
  ThumbnailNameArea,
  ThumbnailNameAreaText,
} from '../PictureList/Styles';

interface ThumbnailProps {
  file: File;
  selected: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ file, selected }) => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    resizeImage(file, true, 500)
      .then(blob => {
        if (thumbnailImage.current) {
          thumbnailImage.current.src = URL.createObjectURL(blob);
        }
      }, () => {
        dispatch(removePicture(file.name));
        dispatch(setError('Error', `Cannot read file '${file.name}'.`));
      });
  }, [file]); //eslint-disable-line

  const handleThumbnailClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (event.ctrlKey) {
      dispatch(updateSelected(file.name, !selected));
    }
    else {
      pictureState.pictures.forEach(element => {
        if (element.selected) {
          dispatch(updateSelected(element.picture.name, false));
        }
      });
      dispatch(updateSelected(file.name, true));
    }
  };

  const handleCheckClick = () => {
    dispatch(updateSelected(file.name, !selected));
  };

  return (
    <ThumbnailContainer ref={container}>
      <ThumbnailPicture
        ref={thumbnailImage}
        onClick={handleThumbnailClick}
        src={placeholder}
      />

      <ThumbnailIconArea onClick={handleCheckClick} selected={selected}>
        {selected && <CheckedIcon />}
      </ThumbnailIconArea>

      <ThumbnailNameArea>
        <ThumbnailNameAreaText>
          {file.name}
        </ThumbnailNameAreaText>
      </ThumbnailNameArea>
    </ThumbnailContainer>
  );
};

export default Thumbnail;