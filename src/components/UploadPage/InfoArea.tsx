import React from 'react';
import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  max-width: ${breakPoints.laptopLWidthNumber - 70}px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;

  ${breakPoints.tablet} {
    padding: 0px 5px;
    padding-bottom: 8px;
  }
`;

const Property = styled.div`
  color: #eee;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const Value = styled.div`
  margin-left: 15px;
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.4;
`;

interface BlockProps {
  name: string;
  value: string | undefined | null;
}

const Block: React.FC<BlockProps> = ({ name, value }) => {
  return (
    <>
      <Property>{name}</Property>
      <Value>{value}</Value>
    </>
  );
};

interface InfoAreaProps {
  pictureCount: number;
  selectedCount: number;
  selectedFile: File | null;
}

const InfoArea: React.FC<InfoAreaProps> = ({
  pictureCount,
  selectedCount,
  selectedFile,
}) => {
  return (
    <Container>
      <Block name="Selected" value={selectedCount + ' of ' + pictureCount} />

      {selectedFile !== null && selectedCount === 1 && (
        <Block name="Filename" value={selectedFile.name} />
      )}
      {selectedCount === 0 && (
        <Block name="Filename" value="No picture selected" />
      )}
      {selectedCount > 1 && (
        <Block name="Filename" value="Multiple pictures selected" />
      )}
    </Container>
  );
};

export default InfoArea;
