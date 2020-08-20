import styled from 'styled-components';
import breakPoints from '../../utils/breakPoints';

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
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  max-width: 600px;
  
  ${breakPoints.mobileXL} {
    margin: 10px;
  }
`;

export const Topic = styled.div`
  padding: 15px 15px 12px 15px;
  color: #222;
  line-height: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  background-color: #ddd;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0px 0px;
`;

export const Content = styled.div`
  /*padding: 20px;
  color: #333;
  line-height: 1;*/
  background-color: #eee;
`;

export const Text = styled.div`
  padding: 20px 20px 10px 20px;
  color: #333;
  line-height: 1;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 5px 10px;
  background-color: #eee;
  border-radius: 0px 0px 5px 5px;
`;

export const Button = styled.button`
  margin: 10px 5px;
  padding: 5px 10px;
  background-color: var(--accent-color-2);
  border: none;
  border-radius: var(--input-border-radius);
  color: #eee;
  font-size: var(--default-font-size);
  cursor: pointer;

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: var(--accent-color-2-hover);
  }
`;

export const WhiteButton = styled(Button)`
  border: 1px solid var(--accent-color-2);
  background-color: #eee;
  color: var(--accent-color-2);

  &:hover {
    border: 1px solid var(--accent-color-2-hover);
    background-color: #fff;
    color: var(--accent-color-2-hover);
  }
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
