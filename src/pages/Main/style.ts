import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px 0px;
  max-width: ${breakPoints.laptopLWidth};
  
  ${breakPoints.mobileXL} {
    justify-content: flex-start;
  }
`;

export const Logo = styled.div`
  margin-bottom: 20px;

  & > svg {
    width: 150px;
    height: 150px;
    color: var(--accent-color-1);
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, .8));
    animation: spin 30s infinite linear;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    ${breakPoints.mobileXL} {
      width: 100px;
      height: 100px;
    }
  }

  ${breakPoints.mobileM} {
    margin-bottom: 10px;

    & > svg {
      width: 100px;
      height: 100px;
    }
  }
`;

const BaseText = styled.div`
  padding: 0px 30px;
  font-family: var(--topic-font-family);
  font-weight: 400;
  color: #fff;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
  text-align: center;
  line-height: 1;
`;

export const BigText = styled(BaseText)`
  font-weight: 800;
  font-size: 36px;
  margin-bottom: 5px;
`;

export const MediumText = styled(BaseText)`
  font-size: 24px;
  line-height: 1.2;
`;

export const SmallText = styled(BaseText)`
  font-size: 16px;
  line-height: 1.5;
`;

export const LoginText = styled(BaseText)`
  margin-bottom: 30px;
  font-size: 20px;
`;

export const Link = styled(RouterLink)`
  font-family: inherit;
  font-weight: inherit;
  text-decoration: none;

  &:link,
  &:visited {
    color: #fff;
    border-bottom: 2px solid var(--accent-color-1);
  }

  &:hover {
    border-bottom: 2px solid #fff;
  }
`;
