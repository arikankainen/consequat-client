import styled, { css } from 'styled-components/macro';

export enum ButtonColor {
  blue,
  whiteWithBlueBorder,
  white,
  whiteBig,
  black,
}

export enum ButtonContentAlign {
  left,
  center,
  right,
}

interface ContainerProps {
  width?: number;
  fullWidth?: boolean;
  margin?: [number, number, number, number];
  contentAlign?: ButtonContentAlign;
  backColor?: ButtonColor;
  rounded?: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
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
  transition: transform 100ms;

  & > svg {
    width: 16px;
    height: 16px;
    color: #fff;
    pointer-events: none;
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
    cursor: default;

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
    props.fullWidth &&
    css`
      min-width: 100%;
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
    props.backColor === ButtonColor.whiteBig &&
    css`
      border: 1px solid #fff;
      color: #444;
      background-color: #fff;
      
      & > div {
        font-family: var(--topic-font-family);
        font-weight: 400;
      }
      padding: 15px 20px;
      font-size: 20px;

      &:focus {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, .05);
      }

      &:hover {
        border: 1px solid #fff;
        color: var(--accent-color-1);
        background-color: #fff;
        transform: scale(1.1);
      }

      & > svg {
        color: #000;
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

export const RequiredText = styled.div<TextProps>`
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

export const OptionalText = styled(RequiredText)<OptionalTextProps>`
  ${props =>
    props.breakPoint &&
    css`
      @media screen and (max-width: ${props.breakPoint}) {
        display: none;  
      }
  `}
`;
