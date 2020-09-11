const imageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      resolve({ width, height });
    };

    image.onerror = reject;
  });
};

export default imageDimensions;
