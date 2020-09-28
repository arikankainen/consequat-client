import styled from 'styled-components/macro';
import breakPoints from '../../utils/breakPoints';

export const PictureListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 0px;
  background-color: #f8f8fa;
`;

export const PictureListToolBar = styled.div`
  position: sticky;
  top: var(--header-height);
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  background-color: rgba(23, 23, 25, 0.9);
  padding: 0px 35px;
  padding-top: 10px;

  ${breakPoints.tablet} {
    padding: 0px 5px;
  }
`;

export const PictureListButtonGroups = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: ${breakPoints.laptopLWidthNumber - 70}px;
`;

export const PictureListButtonGroup = styled.div`
  display: flex;
`;

export const UploadFileButton = styled.input`
  display: none;
`;

export const Loading = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: #000;
`;
