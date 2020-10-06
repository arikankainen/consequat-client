import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { ButtonContentAlign } from './style';
import { ReactComponent as Icon } from 'images/trash-solid.svg';
import { wildClass } from 'utils/testHelpers';

const icon = 'trash-solid.svg';
const text = 'Button text test';

const getElements = (element: HTMLElement) => {
  const container = element.querySelector(wildClass('Container'));
  const required = element.querySelector(wildClass('RequiredText'));
  const optional = element.querySelector(wildClass('OptionalText'));
  const svg = element.querySelector('svg');
  const button = element.querySelector('button');

  return {
    container,
    required,
    optional,
    svg,
    button,
  };
};

describe('rendering button with', () => {
  test('text', () => {
    const component = render(<Button text={text} onClick={() => void 0} />);
    const elements = getElements(component.container);

    expect(elements.required).toHaveTextContent(text);
    expect(elements.optional).toBeNull();
    expect(elements.svg).toBeNull();
  });

  test('icon', () => {
    const component = render(<Button icon={Icon} onClick={() => void 0} />);
    const elements = getElements(component.container);

    expect(elements.required).toBeNull();
    expect(elements.optional).toBeNull();
    expect(elements.svg).toHaveTextContent(icon);
  });

  test('text (optional) and icon', () => {
    const component = render(
      <Button text={text} icon={Icon} onClick={() => void 0} />
    );
    const elements = getElements(component.container);

    expect(elements.required).toHaveTextContent(text);
    expect(elements.optional).toHaveTextContent(text);
    expect(elements.svg).toHaveTextContent(icon);
  });

  test('text (required) and icon', () => {
    const component = render(
      <Button
        text={text}
        icon={Icon}
        textRequired={true}
        onClick={() => void 0}
      />
    );
    const elements = getElements(component.container);

    expect(elements.required).toHaveTextContent(text);
    expect(elements.optional).toBeNull();
    expect(elements.svg).toHaveTextContent(icon);
  });

  test('attribute "type" of "submit"', () => {
    const component = render(
      <Button text={text} type="submit" onClick={() => void 0} />
    );
    const elements = getElements(component.container);

    expect(elements.button).toHaveAttribute('type', 'submit');
  });

  test('attribute "disabled"', () => {
    const component = render(
      <Button text={text} disabled onClick={() => void 0} />
    );
    const elements = getElements(component.container);

    expect(elements.button).toHaveAttribute('disabled');
  });
});

describe('clicking button', () => {
  test('calls event handler once', () => {
    const mockHandler = jest.fn();

    const component = render(
      <Button text={text} type="submit" onClick={mockHandler} />
    );
    const content = getElements(component.container);

    expect(content.button).not.toBeNull();
    if (content.button) fireEvent.click(content.button);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});

describe('rendering styles', () => {
  test('width: 500', () => {
    const component = render(
      <Button text={text} width={500} onClick={() => void 0} />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('min-width: 500px');
  });

  test('fullWidth', () => {
    const component = render(
      <Button text={text} fullWidth onClick={() => void 0} />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('min-width: 100%');
  });

  test('contentAlign: left', () => {
    const component = render(
      <Button
        text={text}
        contentAlign={ButtonContentAlign.left}
        onClick={() => void 0}
      />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('justify-content: flex-start');
  });

  test('contentAlign: center', () => {
    const component = render(
      <Button
        text={text}
        contentAlign={ButtonContentAlign.center}
        onClick={() => void 0}
      />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('justify-content: center');
  });

  test('contentAlign: right', () => {
    const component = render(
      <Button
        text={text}
        contentAlign={ButtonContentAlign.right}
        onClick={() => void 0}
      />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('justify-content: flex-end');
  });

  test('margin: [10, 20, 30, 40]', () => {
    const component = render(
      <Button text={text} margin={[10, 20, 30, 40]} onClick={() => void 0} />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('margin: 10px 20px 30px 40px');
  });

  test('rounded', () => {
    const component = render(
      <Button text={text} rounded onClick={() => void 0} />
    );
    const content = getElements(component.container);

    expect(content.button).toHaveStyle('border-radius: 20px');
  });
});
