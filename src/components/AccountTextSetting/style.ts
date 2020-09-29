import styled from 'styled-components/macro';

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const IconContainer = styled.div`
  margin-right: 15px;
  padding-top: 5px;

  & > svg {
    height: 20px;
    width: 20px;
    color: #555;
  }
`;

export const SettingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: #000;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.3;
`;

export const SettingValue = styled.div`
  color: #666;
  font-size: 16px;
  line-height: 1.3;
`;

export const Link = styled.span`
  color: var(--accent-color-2);
  cursor: pointer;

  &:hover {
    color: var(--accent-color-2-hover);
  }
`;
