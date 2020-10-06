import styled from 'styled-components/macro';

export const TagLegendContainer = styled.div`
  font-family: var(--default-font-family);
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: 25px;
`;

const Legend = styled.span`
  display: inline-block;
  font-weight: 500;
`;

export const LegendAdded = styled(Legend)`
  color: var(--tag-added-color);
`;

export const LegendShared = styled(Legend)`
  color: var(--tag-shared-color);
`;

export const LegendUnique = styled(Legend)`
  color: var(--tag-unique-color);
`;
