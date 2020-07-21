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
  padding: 0px 10px;
  
  ${breakPoints.mobileXL} {
    margin: 0px;
  }
`;

const FieldBlock = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1;
`;

const FieldName = styled.div`
  margin-right: 5px;
`;

const FieldValue = styled.div`
  
`;

export const Input = styled.input`
  height: 30px;
  width: 100%;
  background-color: transparent;
  border: none;
  color: var(--default-font-color);
  font-size: var(--default-font-size);

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
          <FieldName>Pictures selected:</FieldName>
          <FieldValue>{selectedCount} / {pictureCount}</FieldValue>
        </FieldBlock>

        <FieldBlock>
          {selectedFile !== null && selectedCount === 1 &&
            <Input
              value={selectedFile.name}
              suppressContentEditableWarning={true}
              spellCheck={false}
            />}
          
          {selectedCount === 0 &&
            <Input
              placeholder='No picture selected'
              suppressContentEditableWarning={true}
              spellCheck={false}
              disabled
            />}

          {selectedCount > 1 &&
            <Input
              placeholder='Multiple pictures'
              suppressContentEditableWarning={true}
              spellCheck={false}
              disabled
            />}
        </FieldBlock>
        
      </Container>
    </OuterContainer>
  );
};

export default EditArea;