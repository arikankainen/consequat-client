import styled from 'styled-components/macro';

export const InputContainer = styled.div`
  display: flex;
  margin: 10px 0px;
`;

export const Input = styled.input`
  background-color: #fff;
  border: 1px solid #ccc;
  width: 100%;
  color: #000;
  font-size: 14px;
  padding: 2px 6px 2px 6px;
  line-height: 1;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }
`;
