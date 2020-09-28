import styled from 'styled-components/macro';

export const InitialUploadOuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const InitialUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  color: #000;

  & > svg {
    height: var(--image-size);
    color: var(--image-color);
    margin-bottom: 20px;
  }
`;

export const InitialUploadFileButton = styled.input`
  display: none;
`;
