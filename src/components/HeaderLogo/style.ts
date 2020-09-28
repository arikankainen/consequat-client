import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import breakPoints from '../../utils/breakPoints';

export const LogoLink = styled(Link)`
  height: 30px;

  ${breakPoints.custom(600)} {
    display: none;
  }
`;

export const LogoImage = styled.picture`
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;

  &:hover {
    filter: brightness(1.2);
  }

  & > img {
    height: 30px;
  }
`;
