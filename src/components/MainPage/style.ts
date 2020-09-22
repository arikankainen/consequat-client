import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: ${breakPoints.laptopLWidth};
`;

export const Image = styled.img`
  max-width: 800px;
  padding: 50px;

  /*
  filter:
    drop-shadow(2px 2px 1px rgba(0, 0, 0, .5))
    drop-shadow(0px 0px 20px rgba(0, 0, 0, 1))
  ;
  */

  ${breakPoints.custom(800)} {
    max-width: 100%;
    padding: 50px;
  }
`;

export const InitialUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
  color: #000;

  & > svg {
    height: var(--image-size);
    color: var(--image-color);
    margin-bottom: 20px;
  }
`;

export const InitialUploadFileButton = styled.input`
  display: none;
`;
