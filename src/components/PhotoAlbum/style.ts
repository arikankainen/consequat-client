import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const AlbumContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
`;

export const TopicContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding-top: 25px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;

  ${breakPoints.tablet} {
    padding-top: 15px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 5px;
  }

  background-color: #fff;
`;

export const NameAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Name = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #222;
  line-height: 1;
`;

export const Description = styled.div`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 300;
  color: #222;
  line-height: 1;
`;

export const Edit = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin: 0px;
`;

export const PictureListArea = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 5px;
  width: 100%;
  padding: 0px;
  background-color: #fff;
  padding: 20px;

  ${breakPoints.tablet} {
    padding: 5px;
  }
`;