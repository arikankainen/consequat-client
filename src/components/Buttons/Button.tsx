import React from 'react';
import * as Styled from './style';

interface ButtonProps {
  text?: string;
  icon?: React.FunctionComponent;
  color?: Styled.ButtonColor;
  width?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  textRequired?: boolean;
  breakPoint?: string;
  contentAlign?: Styled.ButtonContentAlign;
  margin?: [number, number, number, number];
  rounded?: boolean;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  refProp?: React.RefObject<HTMLButtonElement> | null | undefined;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <Styled.Container
      type={props.type}
      disabled={props.disabled}
      width={props.width}
      fullWidth={props.fullWidth}
      contentAlign={props.contentAlign}
      backColor={props.color}
      margin={props.margin}
      rounded={props.rounded}
      onClick={props.onClick}
      ref={props.refProp}
    >
      {props.icon && <props.icon />}

      {props.text && (props.textRequired || !props.icon || props.width) && (
        <Styled.RequiredText icon={!!props.icon}>
          {props.text}
        </Styled.RequiredText>
      )}

      {props.text && !props.textRequired && props.icon && !props.width && (
        <Styled.OptionalText breakPoint={props.breakPoint} icon={!!props.icon}>
          {props.text}
        </Styled.OptionalText>
      )}
    </Styled.Container>
  );
};

export default Button;
