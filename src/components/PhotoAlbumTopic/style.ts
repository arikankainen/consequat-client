import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const Container = styled.div`
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
