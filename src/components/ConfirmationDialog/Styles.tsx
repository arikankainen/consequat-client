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
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1002;

  ${breakPoints.mobileXL} {
    top: 50%;
    left: 0;
    transform: translateX(0) translateY(-50%);
    width: 100%;
    padding: 0px 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
`;

export const Topic = styled.div`
  padding: 15px;
  color: #222;
  line-height: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  background-color: #ddd;
`;

export const Content = styled.div`
  padding: 20px;
  color: #333;
  line-height: 1;
  background-color: #eee;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 5px 10px;
  background-color: #eee;
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
