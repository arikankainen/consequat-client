import React from 'react';
import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 8px;
  
  ${breakPoints.mobileXL} {
    flex-direction: column;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: hidden;
  padding: 0px 10px;

  ${breakPoints.laptop} {
    padding: 0px;
  }
`;

interface InfoAreaProps {
  pictureCount: number;
  selectedCount: number;
  selectedFile: File | null;
}

const InfoArea: React.FC<InfoAreaProps> = ({ pictureCount, selectedCount, selectedFile }) => {
  
  return (
    <Container>
      <TextBlock>
        {selectedCount}/{pictureCount} selected
      </TextBlock>

      {selectedFile !== null && selectedCount === 1 && <TextBlock>{selectedFile.name}</TextBlock>}
      {selectedCount === 0 && <TextBlock>No picture selected</TextBlock>}
      {selectedCount > 1 && <TextBlock>Multiple pictures</TextBlock>}
    </Container>
  );
};

export default InfoArea;