import styled from 'styled-components/macro';

export const PropertyWithIcon = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--alt-font-family);
  font-size: 16px;
  font-weight: 300;
  line-height: 1;
  margin-top: 10px;

  & > svg {
    height: 16px;
    width: 16px;
    min-height: 16px;
    min-width: 16px;
    color: #555;
    margin-right: 7px;
    margin-bottom: 2px;
  }

  &:first-child {
    margin-top: 0px;
  }
`;

export const TextProperty = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
