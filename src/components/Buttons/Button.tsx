import React from 'react';
import styled, { css } from 'styled-components';

export enum ButtonColor {
  blue,
  whiteWithBlueBorder,
  white,
  black,
}

export enum ButtonContentAlign {
  left,
  center,
  right,
}

interface ContainerProps {
  width?: number;
  margin?: [number, number, number, number];
  contentAlign?: ButtonContentAlign;
  backColor?: ButtonColor;
  rounded?: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  margin: 10px 5px;
  padding: 6px 10px;
  border: 1px solid var(--accent-color-2);
  border-radius: var(--input-border-radius);
  color: #fff;
  background-color: var(--accent-color-2);
  font-size: var(--default-font-size);
  font-weight: 300;
  line-height: 1;
  cursor: pointer;

  & > svg {
    width: 16px;
    height: 16px;
    color: #fff;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 217, .2);
  }

  &:hover {
    border: 1px solid var(--accent-color-2-hover);
    background-color: var(--accent-color-2-hover);
  }
  
  &:disabled {
    border: 1px solid var(--accent-color-2-disabled);
    background-color: var(--accent-color-2-disabled);
    color: #000;

    & > svg {
      color: #111155;
    }
  }

  ${props =>
    props.rounded &&
    css`
      border-radius: 20px;
  `}

  ${props =>
    props.margin &&
    css`
      margin:
        ${props.margin[0]}px
        ${props.margin[1]}px
        ${props.margin[2]}px
        ${props.margin[3]}px;
  `}

  ${props =>
    props.width &&
    css`
      min-width: ${props.width}px;
  `}

  ${props =>
    props.contentAlign === ButtonContentAlign.left &&
    css`
      justify-content: flex-start;
  `}

  ${props =>
    props.contentAlign === ButtonContentAlign.right &&
    css`
      justify-content: flex-end;
  `}

  ${props =>
    props.backColor === ButtonColor.whiteWithBlueBorder &&
    css`
      border: 1px solid var(--accent-color-2);
      color: var(--accent-color-2-disabled);
      background-color: #fafafa;

      &:hover {
        border: 1px solid var(--accent-color-2-hover);
        color: var(--accent-color-2-hover);
        background-color: #fff;
      }

      & > svg {
        color: var(--accent-color-2-hover);
      }

      &:disabled {
        border: 1px solid #111155;
        color: #111155;
        background-color: #aaa;
      }
  `}

  ${props =>
    props.backColor === ButtonColor.white &&
    css`
      border: 1px solid #ddd;
      color: #555;
      background-color: transparent;

      &:focus {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, .05);
      }

      &:hover {
        border: 1px solid #ccc;
        color: #333;
        background-color: #eee;
      }

      & > svg {
        color: #555;
      }

      &:disabled {
        border: 1px solid #ccc;
        color: #999;
        background-color: #eee;
      }
  `}

  ${props =>
    props.backColor === ButtonColor.black &&
    css`
      border: 1px solid #444;
      color: #ccc;
      background-color: #111;

      &:focus {
        box-shadow: 0 0 0 3px rgba(255, 255, 255, .1);
      }

      &:hover {
        border: 1px solid #555;
        color: #fff;
        background-color: #222;
      }

      &:disabled {
        border: 1px solid #222;
        color: #666;
        background-color: #111;

        & > svg {
          color: #666;  
        }
      }
  `}
`;

interface TextProps {
  icon?: boolean;
}

const RequiredText = styled.div<TextProps>`
  margin-top: 1px;

  ${props =>
    props.icon &&
    css`
      margin-left: 8px;
  `}
`;

interface OptionalTextProps {
  breakPoint?: string;
}

const OptionalText = styled(RequiredText)<OptionalTextProps>`
  ${props =>
    props.breakPoint &&
    css`
      @media screen and (max-width: ${props.breakPoint}) {
        display: none;  
      }
  `}
`;

interface ButtonProps {
  text?: string;
  icon?: React.FunctionComponent;
  color?: ButtonColor;
  width?: number;
  disabled?: boolean;
  textRequired?: boolean;
  breakPoint?: string;
  contentAlign?: ButtonContentAlign;
  margin?: [number, number, number, number];
  rounded?: boolean;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  refProp?: React.RefObject<HTMLButtonElement> | null | undefined;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <Container
      type={props.type}
      disabled={props.disabled}
      width={props.width}
      contentAlign={props.contentAlign}
      backColor={props.color}
      margin={props.margin}
      rounded={props.rounded}
      onClick={props.onClick}
      ref={props.refProp}
    >
      {props.icon && <props.icon />}

      {props.text && (props.textRequired || !props.icon || props.width) && (
        <RequiredText icon={!!props.icon}>{props.text}</RequiredText>
      )}

      {props.text && !props.textRequired && props.icon && !props.width && (
        <OptionalText breakPoint={props.breakPoint} icon={!!props.icon}>
          {props.text}
        </OptionalText>
      )}
    </Container>
  );
};

export default Button;
