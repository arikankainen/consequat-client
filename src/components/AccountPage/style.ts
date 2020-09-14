import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export const TopicAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  box-shadow: var(--default-box-shadow);
  z-index: 1;
`;

export const TopicArea = styled.div`
  width: 100%;
  max-width: ${breakPoints.laptopLWidth};
  padding: 50px;

  ${breakPoints.tablet} {
    padding: 20px;
  }

  ${breakPoints.mobileXL} {
    padding: 15px;
  }
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

export const Topic = styled.h1`
  color: #000;
  font-family: var(--topic-font-family);
  font-weight: 200;
  font-size: 24px;
  line-height: 1.3;
`;

export const SubTopic = styled.h2`
  color: #666;
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
    padding: 10px;
  }

  ${breakPoints.mobileXL} {
    padding: 10px 0px;
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

  ${breakPoints.tablet} {
    margin: 10px;
  }

  ${breakPoints.mobileXL} {
    padding: 15px;
    margin: 10px 0px;
  }
`;

export const BoxTopic = styled.h3`
  margin-bottom: 10px;
  color: #000;
  font-weight: 300;
  font-size: 20px;
  line-height: 1;
`;

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const IconContainer = styled.div`
  margin-right: 15px;
  padding-top: 5px;

  & > svg {
    height: 20px;
    color: var(--accent-color-1);
  }
`;

export const SettingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
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

export const SettingDescription = styled.div`
  color: #666;
  font-size: 13px;
  line-height: 1.3;
  padding-top: 4px;
`;

export const Link = styled.span`
  color: var(--accent-color-2);
  cursor: pointer;

  &:hover {
    color: var(--accent-color-2-hover);
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  margin-top: 2px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
`;
