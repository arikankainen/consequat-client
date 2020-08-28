import styled from 'styled-components';

export const BackDrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1002;
`;

export const FloatingContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1003;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 5px;
`;

export const Topic = styled.div`
  padding: 20px 20px 10px 20px;
  color: #111;
  line-height: 1;
  text-align: left;
  font-size: 24px;
  font-weight: 300;
  background-color: #fff;
  border-radius: 5px 5px 0px 0px;
`;

export const Content = styled.div`
  background-color: #fff;
`;

export const Text = styled.div`
  padding: 20px 20px 10px 20px;
  color: #000;
  line-height: 1;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  border-radius: 0px 0px 5px 5px;
`;

export const ProgressContainer = styled.div`
  height: 20px;
  margin: 0px 15px 0px 15px;
  background-color: #ddd;
`;

interface ProgressProps {
  progress: number;
}

export const Progress = styled.div<ProgressProps> `
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #55bb55;
`;

export const SavingText = styled.div`
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