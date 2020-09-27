import { PhotoUserExtended } from './types';

export interface Dimension {
  index: number;
  width: number;
  height: number;
  top: number;
  left: number;
}

interface InputObject {
  photos: PhotoUserExtended[];
  containerWidth: number;
  preferredImageHeight: number;
  gap: number;
}

interface ReturnObject {
  dimensions: Dimension[];
  totalHeight: number;
}

const gridCalculator = ({
  photos,
  containerWidth,
  preferredImageHeight,
  gap,
}: InputObject): ReturnObject | null => {
  if (!photos || photos.length === 0) return null;

  const getDimensions = (i: number): [number, number] => {
    return i < photos.length ? [photos[i].width, photos[i].height] : [0, 0];
  };

  const getRatio = (i: number) => {
    return i < photos.length ? photos[i].width / photos[i].height : 0;
  };

  // landscape 3:2 ratio: 1.50
  // portrait 3:2 ratio:  0.66
  // square ratio:        1.00
  const maxTotalRatioPerRow = containerWidth / preferredImageHeight;
  const maxSizeIncreaseMultiplier = 1.8;
  const imageRows: number[][] = [];

  for (let i = 0; i < photos.length; i++) {
    let imagesInRowRatio = 0;
    let firstImageInRow = true;
    const imageColumns: number[] = [];

    for (let ii = i; ii < photos.length; ii++) {
      const currentImageRatio = getRatio(i);

      if (
        !firstImageInRow &&
        imagesInRowRatio + currentImageRatio > maxTotalRatioPerRow &&
        imagesInRowRatio * maxSizeIncreaseMultiplier > maxTotalRatioPerRow
      ) {
        i--;
        break;
      }

      imageColumns.push(i);
      imagesInRowRatio += currentImageRatio;
      firstImageInRow = false;
      i++;
    }

    imageRows.push(imageColumns);
  }

  let index = 0;
  let top = 0;
  const dimensions: Dimension[] = [];

  imageRows.forEach(imageRow => {
    let totalTargetWidth = 0;

    for (let i = 0; i < imageRow.length; i++) {
      const [imageWidth, imageHeight] = getDimensions(imageRow[i]);

      const targetMultiplier = imageHeight / preferredImageHeight;
      const targetWidth = imageWidth / targetMultiplier;
      totalTargetWidth += targetWidth;
    }

    const totalGap = (imageRow.length - 1) * gap;
    const targetTotalMultiplier =
      (containerWidth - totalGap) / totalTargetWidth;

    let topAddition = 0;
    let left = 0;

    for (let i = 0; i < imageRow.length; i++) {
      const [imageWidth, imageHeight] = getDimensions(imageRow[i]);

      const targetMultiplier = imageHeight / preferredImageHeight;
      const targetWidth = imageWidth / targetMultiplier;

      const width =
        targetTotalMultiplier < maxSizeIncreaseMultiplier
          ? targetWidth * targetTotalMultiplier
          : targetWidth;

      const height =
        targetTotalMultiplier < maxSizeIncreaseMultiplier
          ? preferredImageHeight * targetTotalMultiplier
          : preferredImageHeight;

      dimensions.push({
        index,
        width,
        height,
        top,
        left,
      });

      topAddition = height + gap;
      left += width + gap;
      index++;
    }

    top += topAddition;
  });

  const lastRowItem = dimensions[dimensions.length - 1];
  const totalHeight = lastRowItem.top + lastRowItem.height;

  return {
    dimensions,
    totalHeight,
  };
};

export default gridCalculator;
