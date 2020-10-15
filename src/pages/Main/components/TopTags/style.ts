import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';
import { Link } from 'react-router-dom';

export const TopTagsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;
