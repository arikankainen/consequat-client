import styled from 'styled-components/macro';
import breakPoints from 'utils/breakPoints';

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  width: 90%;
  max-width: 500px;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 5px;

  ${breakPoints.mobileXL} {
    width: 100%;
    margin: 0px;
    border-radius: 0;
  }
`;

export const DialogTopic = styled.div`
  padding: 25px 20px 10px 20px;
  color: #111;
  line-height: 1;
  text-align: left;
  font-family: var(--topic-font-family);
  font-size: 24px;
  font-weight: 200;
  background-color: #fff;
  border-radius: 5px 5px 0px 0px;
`;

export const DialogContentNormal = styled.div`
  background-color: #fff;
  overflow: auto;
`;

export const DialogPadding = styled.div`
  padding: 15px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 25px -5px 0px -5px;
`;

export const DialogContentGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  background-color: #fff;
  overflow: auto;
  padding: 15px;
`;

export const Warning = styled.div`
  margin: 0px 5px 15px 5px;
  color: #000;
  font-size: 14px;
  line-height: 1.2;
  grid-column: span 2;
`;

export const Comment = styled.div`
  margin-left: 5px;
  color: #999;
  font-size: 14px;
  line-height: 1.2;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export const DialogButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  border-radius: 0px 0px 5px 5px;
`;

export const Text = styled.div`
  padding: 20px 20px 10px 20px;
  color: #000;
  line-height: 1;
`;

export const ProgressContainer = styled.div`
  height: 20px;
  margin: 0px 15px 0px 15px;
  background-color: #ddd;
`;

interface ProgressProps {
  progress: number;
}

export const Progress = styled.div<ProgressProps>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #55bb55;
`;

export const SavingIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3px;
  padding-left: 10px;
  padding-right: 15px;
  width: 100%;
  color: var(--accent-color-2);
  font-size: 16px;
  line-height: 1;
  font-weight: 400;
  text-align: left;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
`;
