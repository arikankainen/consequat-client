import styled, { css } from 'styled-components/macro';

interface PropertyProps {
  hide?: boolean;
}

export const Property = styled.div<PropertyProps>`
  color: #eee;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;

  max-height: 50px;
  overflow: hidden;
  transition: max-height 0.1s ease, opacity 0.5s ease;

  ${props =>
    props.hide &&
    css`
      max-height: 0px;
      opacity: 0;
  `}
`;

interface ValueProps {
  hide?: boolean;
  grayed?: boolean;
}

export const Value = styled.div<ValueProps>`
  margin-left: 15px;
  color: #ddd;
  font-size: 14px;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.4;

  max-height: 50px;
  overflow: hidden;
  transition: max-height 0.1s ease, opacity 0.5s ease;

  ${props =>
    props.hide &&
    css`
      max-height: 0px;
      opacity: 0;
  `}

  ${props =>
    props.grayed &&
    css`
      color: #888;
  `}
`;
