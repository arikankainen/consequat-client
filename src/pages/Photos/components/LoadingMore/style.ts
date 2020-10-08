import styled, { css } from 'styled-components/macro';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  
  ${props =>
    props.show &&
    css`
        padding: 20px;
  `}
`;
