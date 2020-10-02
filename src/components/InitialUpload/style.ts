import styled from 'styled-components/macro';

export const InitialUploadOuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 500px;
`;

export const InitialUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  color: #000;
  line-height: 1.3;

  & > svg {
    height: var(--image-size);
    color: var(--image-color);
    margin-bottom: 20px;
  }

  & > form {
  display: flex;
  justify-content: center;
  }
`;

export const InitialUploadFileButton = styled.input`
  display: none;
`;

export const Topic = styled.h1`
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 24px;
  margin-bottom: 10px;
`;
