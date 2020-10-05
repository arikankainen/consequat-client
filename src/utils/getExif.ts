import * as ExifReader from 'exifreader';
import { Exif } from '../utils/types';

const getExif = (file: File): Promise<Exif | null> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = function () {
      const data = fr.result;

      if (data instanceof ArrayBuffer) {
        const tags = ExifReader.load(data);

        const exif: Exif = {
          dateTimeOriginal: tags.DateTimeOriginal
            ? tags.DateTimeOriginal.description
            : '',
          fNumber: tags.FNumber ? tags.FNumber.description : '',
          isoSpeedRatings: tags.ISOSpeedRatings
            ? tags.ISOSpeedRatings.description
            : '',
          shutterSpeedValue: tags.ShutterSpeedValue
            ? tags.ShutterSpeedValue.description
            : '',
          focalLength: tags.FocalLength ? tags.FocalLength.description : '',
          flash: tags.Flash ? tags.Flash.description : '',
          make: tags.Make ? tags.Make.description : '',
          model: tags.Model ? tags.Model.description : '',
        };

        resolve(exif);
      }
    };
    fr.readAsArrayBuffer(file);

    fr.onerror = reject;
  });
};

export default getExif;
