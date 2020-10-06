import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

export const AlbumContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: var(--default-box-shadow);
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
  margin-right: 10px;
`;

export const Name = styled.div`
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 24px;
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

export const EmptyText = styled.div`
  color: #999;

  ${breakPoints.tablet} {
    padding: 5px;
  }
`;
