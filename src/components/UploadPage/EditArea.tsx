import React from 'react';
import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

const OuterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px 20px;
  padding: 10px;
  background-color: var(--navigation-bg-color);

  
  ${breakPoints.mobileXL} {
    margin: 0px 10px;
  }
`;

const FieldBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const FieldName = styled.div`
  margin-right: 5px;
`;

const FieldValue = styled.div`
  
`;

export const Input = styled.input`
  height: 30px;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: var(--input-bg-color);
  border: none;
  border-radius: var(--input-border-radius);
  color: var(--input-color);
  font-size: var(--default-font-size);
  text-align: center;

  &:focus {
    outline-width: 0;
  }
`;

interface EditAreaProps {
  pictureCount: number;
  selectedCount: number;
  selectedFile: File | null;
}

const EditArea: React.FC<EditAreaProps> = ({ pictureCount, selectedCount, selectedFile }) => {
  return (
    <OuterContainer>
      <Container>
        <FieldBlock>
          <FieldName>Selected pictures:</FieldName>
          <FieldValue>{selectedCount} / {pictureCount}</FieldValue>
        </FieldBlock>
        
        <FieldBlock>
          <FieldName>Picture name:</FieldName>
          {selectedCount === 0 && <FieldValue>(Picture not selected)</FieldValue>}
          {selectedCount > 1 && <FieldValue>(Multiple pictures)</FieldValue>}
          {selectedFile !== null && selectedCount === 1 && <FieldValue>{selectedFile.name}</FieldValue>}
        </FieldBlock>
      </Container>
    </OuterContainer>
  );
};

export default EditArea;