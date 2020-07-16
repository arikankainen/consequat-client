import React from 'react';
import styled from 'styled-components';

const Namefield = styled.div`
  max-width: 100%;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;

  &:active,
  &:focus {
    border: none;
    outline: none;

    background-color: var(--input-bg-color);
    color: var(--input-color);
  }
`;

interface FilenameProps {
  text: string;
}

const Filename: React.FC<FilenameProps> = ({ text }) => {
  return (
    <Namefield
      contentEditable={true}
      spellCheck={false}
      suppressContentEditableWarning={true}
    >
      {text}
    </Namefield>
  );
};

export default Filename;