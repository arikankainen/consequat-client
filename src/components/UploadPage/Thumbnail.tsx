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
  ThumbnailProgress
} from './Styles';

interface ThumbnailProps {
  picture: File;
  progress: number;
  selected: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ picture, progress, selected }) => {
  const pictureState = useSelector((state: RootState) => state.picture);
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const progressBar = useRef<HTMLProgressElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    resizeImage(picture, true, 500)
      .then(blob => {
        if (thumbnailImage.current) {
          thumbnailImage.current.src = URL.createObjectURL(blob);
        }
      }, () => {
        dispatch(removePicture(picture.name));
        dispatch(setError('Error', `Cannot read file '${picture.name}'.`));
      });
  }, [picture]); //eslint-disable-line

  const handleThumbnailClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (event.ctrlKey) {
      dispatch(updateSelected(picture.name, !selected));
    }
    else {
      pictureState.pictures.forEach(element => {
        if (element.selected) {
          dispatch(updateSelected(element.picture.name, false));
        }
      });
      dispatch(updateSelected(picture.name, true));
    }
  };

  const handleCheckClick = () => {
    dispatch(updateSelected(picture.name, !selected));
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
          {picture.name}
        </ThumbnailNameAreaText>
      </ThumbnailNameArea>

      {progress > 0 && <ThumbnailProgress
        max='100'
        ref={progressBar}
        value={progress}
        progress={progress}
      />}
    </ThumbnailContainer>
  );
};

export default Thumbnail;