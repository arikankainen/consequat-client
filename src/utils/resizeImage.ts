const resizeImage = (file: File, square: boolean, maxSize: number): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const inputWidth = image.width;
      const inputHeight = image.height;

      const squareSize = inputWidth > inputHeight ? inputHeight : inputWidth;
      const squareStartX = inputWidth > inputHeight ? (inputWidth - inputHeight) / 2 : 0;
      const squareStartY = inputHeight > inputWidth ? (inputHeight - inputWidth) / 2 : 0;

      const ratio = inputWidth > inputHeight ? maxSize / inputWidth : maxSize / inputHeight;
      const outputWidth = inputWidth * ratio;
      const outputHeight = inputHeight * ratio;

      const canvas = document.createElement('canvas');
      canvas.width = square ? maxSize : outputWidth;
      canvas.height = square ? maxSize : outputHeight;

      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      if (square) context.drawImage(image, squareStartX, squareStartY, squareSize, squareSize, 0, 0, maxSize, maxSize);
      else context.drawImage(image, 0, 0, inputWidth, inputHeight, 0, 0, outputWidth, outputHeight);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, file.type);
    };

    image.onerror = reject;
  });
};

export default resizeImage;