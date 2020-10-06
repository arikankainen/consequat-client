import React from 'react';
import { Exif } from 'utils/types';
import * as Styled from './style';
import * as parseExif from 'utils/parseExif';

interface PhotoInfoExifProps {
  exif: Exif;
}

const PhotoInfoExif: React.FC<PhotoInfoExifProps> = ({ exif }) => {
  const fNumber = parseExif.parseFNumber(exif.fNumber);
  const iso = parseExif.parseIso(exif.isoSpeedRatings);
  const shutter = parseExif.parseShutter(exif.shutterSpeedValue);
  const focal = parseExif.parseFocal(exif.focalLength);
  const flash = parseExif.parseFlash(exif.flash);
  const camera = parseExif.parseCamera(exif.make, exif.model);

  return (
    <Styled.Container>
      {camera && <Styled.ExifItem>{camera}</Styled.ExifItem>}
      {flash && <Styled.ExifItem>{flash}</Styled.ExifItem>}
      {fNumber && <Styled.ExifItem>{fNumber}</Styled.ExifItem>}
      {shutter && <Styled.ExifItem>{shutter}</Styled.ExifItem>}
      {iso && <Styled.ExifItem>{iso}</Styled.ExifItem>}
      {focal && <Styled.ExifItem>{focal}</Styled.ExifItem>}
    </Styled.Container>
  );
};

export default PhotoInfoExif;
