import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../reducers/notificationReducer';
import { updateSelected, removePicture } from '../../reducers/pictureReducer';
import resizeImage from '../../utils/resizeImage';
import placeholder from '../../images/placeholder.png';
import Thumbnail from '../Thumbnail/Thumbnail';

interface UploadThumbnailProps {
  file: File;
  selected: boolean;
}

const UploadThumbnail: React.FC<UploadThumbnailProps> = ({
  file,
  selected,
}) => {
  const thumbnailImage = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    resizeImage(file, true, 500).then(
      (blob) => {
        if (thumbnailImage.current) {
          thumbnailImage.current.src = URL.createObjectURL(blob);
        }
      },
      () => {
        dispatch(removePicture(file.name));
        dispatch(setError('Error', `Cannot read file '${file.name}'.`));
      }
    );
  }, [file]); //eslint-disable-line

  const handleThumbnailClick = () => {
    dispatch(updateSelected(file.name, !selected));
  };

  const handleCheckClick = () => {
    dispatch(updateSelected(file.name, !selected));
  };

  return (
    <Thumbnail
      src={placeholder}
      name={file.name}
      selected={selected}
      handleIconClick={handleCheckClick}
      handleThumbnailClick={handleThumbnailClick}
      containerRef={container}
      thumbnailRef={thumbnailImage}
    />
  );
};

export default UploadThumbnail;
