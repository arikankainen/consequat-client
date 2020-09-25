import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  width: 100%;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  & > svg {
    height: 16px;
    width: 16px;
    min-height: 16px;
    min-width: 16px;
    color: #555;
    margin-right:10px;
    margin-top: 10px;
  }
`;

export const InputContainer = styled.div`

`;

export const Author = styled.div`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
`;

export const Date = styled.div`
  font-family: var(--alt-font-family);
  font-size: 13px;
  font-weight: 300;
  line-height: 1;
  margin-top: 5px;
`;

export const Text = styled.div`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  margin-top: 7px;
`;

export const TextArea = styled.textarea`
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1.2;
  width: 400px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 5px;

  &:focus {
    outline: none;
    border: 1px solid var(--accent-color-2);
  }

  ${breakPoints.custom(600)} {
    width: 100%;
  }
`;
