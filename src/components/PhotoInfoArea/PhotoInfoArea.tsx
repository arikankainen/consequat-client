import React from 'react';
import { Property, Value, Container } from './style';

interface InfoBlockProps {
  name: string;
  value: string | undefined | null;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ name, value }) => {
  return (
    <>
      <Property>{name}</Property>
      <Value>{value}</Value>
    </>
  );
};

interface PhotoInfoAreaProps {
  pictureCount: number;
  selectedCount: number;
  selectedFile: File | null;
}

const PhotoInfoArea: React.FC<PhotoInfoAreaProps> = ({
  pictureCount,
  selectedCount,
  selectedFile,
}) => {
  return (
    <Container>
      <InfoBlock
        name="Selected"
        value={selectedCount + ' of ' + pictureCount}
      />

      {selectedFile !== null && selectedCount === 1 && (
        <InfoBlock name="Filename" value={selectedFile.name} />
      )}
      {selectedCount === 0 && (
        <InfoBlock name="Filename" value="No picture selected" />
      )}
      {selectedCount > 1 && (
        <InfoBlock name="Filename" value="Multiple pictures selected" />
      )}
    </Container>
  );
};

export default PhotoInfoArea;
