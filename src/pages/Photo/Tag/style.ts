import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const TagLink = styled(Link)`
  text-decoration: none;
  padding-right: 5px;

  &:link,
  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-1);
  }
`;
