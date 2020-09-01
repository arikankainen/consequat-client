import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
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

export const TopicArea = styled.div`
  padding: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow: var(--default-box-shadow);
`;

export const Topic = styled.h1`
  color: #000;
  font-weight: 300;
  font-size: 24px;
  line-height: 1.3;
`;

export const SubTopic = styled.h2`
  color: #666;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.3;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: stretch;
  width: 100%;
  padding: 20px;

  ${breakPoints.tablet} {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  background-color: #fff;
  box-shadow: var(--default-box-shadow);
  padding: 20px;
  margin: 20px;
`;

export const BoxTopic = styled.h3`
  margin-bottom: 10px;
  color: #000;
  font-weight: 300;
  font-size: 20px;
  line-height: 1;
`;

export const Setting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const SettingText = styled.div`
  color: #000;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.3;
`;

export const SettingValue = styled.div`
  color: #666;
  font-size: 16px;
  line-height: 1.3;
`;
