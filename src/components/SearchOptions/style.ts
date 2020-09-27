import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
`;

export const Topic = styled.div`
  font-size: 16px;
  color: #000;
  margin-bottom: 15px;
  line-height: 1.3;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  margin: 5px 10px 0px 10px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  margin-top: 2px;
`;

export const Label = styled.label`
  color: #000;
  font-weight: 300;
  font-size: 16px;
  line-height: 1.3;
`;
