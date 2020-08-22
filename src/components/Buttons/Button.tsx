import React from 'react';
import styled, { css } from 'styled-components';
import breakPoints from '../../utils/breakPoints';

export enum ButtonColor {
  blue,
  white,
}

export enum ButtonContentAlign {
  left,
  center,
  right,
}

interface ButtonContainerProps {
  width?: number;
  contentAlign?: ButtonContentAlign;
  backColor?: ButtonColor;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
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

  ${props => props.backColor === ButtonColor.white && css`
    border: 1px solid var(--accent-color-2);
    color: var(--accent-color-2-disabled);
    background-color: #eee;
  `}

  ${props => props.width && css`
    min-width: ${props.width}px;
  `}

  ${props => props.contentAlign === ButtonContentAlign.left && css`
    justify-content: flex-start;
  `}

  ${props => props.contentAlign === ButtonContentAlign.right && css`
    justify-content: flex-end;
  `}

  & > svg {
    width: 16px;
    height: 16px;
    color: #fff;

    ${props => props.backColor === ButtonColor.white && css`
      color: var(--accent-color-2-hover);
    `}
  }

  &:focus {
    outline-width: 0;
  }

  &:hover {
    border: 1px solid var(--accent-color-2-hover);
    background-color: var(--accent-color-2-hover);

    ${props => props.backColor === ButtonColor.white && css`
      border: 1px solid var(--accent-color-2-hover);
      color: var(--accent-color-2-hover);
      background-color: #fff;
    `}
  }
  
  &:disabled {
    border: 1px solid var(--accent-color-2-disabled);
    background-color: var(--accent-color-2-disabled);
    color: #111155;

    & > svg {
      color: #111155;
    }

    ${props => props.backColor === ButtonColor.white && css`
      border: 1px solid #111155;
      color: #111155;
      background-color: #aaa;
    `}
  }
`;

interface TextProps {
  icon?: boolean;
}

const RequiredText = styled.div<TextProps>`
  margin-top: 1px;

  ${props => props.icon && css`
    margin-left: 8px;
  `}
`;

const OptionalText = styled(RequiredText)`
  ${breakPoints.mobileXL} {
    display: none;
  }
`;

interface ButtonProps {
  text?: string;
  icon?: React.FunctionComponent;
  color?: ButtonColor;
  width?: number;
  disabled?: boolean;
  textRequired?: boolean;
  contentAlign?: ButtonContentAlign;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonContainer
      disabled={props.disabled}
      width={props.width}
      contentAlign={props.contentAlign}
      backColor={props.color}
      onClick={props.onClick}
    >
      {props.icon &&
        <props.icon />
      }

      {props.text && ((props.textRequired || !props.icon) || props.width) &&
        <RequiredText icon={!!props.icon}>{props.text}</RequiredText>
      }

      {props.text && ((!props.textRequired && props.icon) && !props.width) &&
        <OptionalText icon={!!props.icon}>{props.text}</OptionalText>
      }
    </ButtonContainer>
  );
};

export default Button;
