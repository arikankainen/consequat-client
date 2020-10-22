import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import Confirmation, { ConfirmationProps } from './Confirmation';
import { wait } from 'utils/testHelpers';

describe('rendering confirmation dialog', () => {
  test('rendering all elements (buttons, spinner and fadeout works)', async () => {
    const okClick = jest.fn();
    const cancelClick = jest.fn();

    const settings1: ConfirmationProps = {
      open: true,
      topic: 'Test topic',
      text: 'Text1',
      progress: 21,
      text2: 'Text2',
      progress2: 79,
      handleOk: okClick,
      handleCancel: cancelClick,
      disableOk: false,
      disableCancel: false,
      processing: false,
    };

    const settings2: ConfirmationProps = {
      open: true,
      topic: 'Test topic2',
      text: 'Text12',
      progress: 88,
      text2: 'Text22',
      progress2: 99,
      handleOk: okClick,
      handleCancel: cancelClick,
      disableOk: false,
      disableCancel: false,
      processing: true,
    };

    const emptySettings: ConfirmationProps = {};

    const { rerender } = render(<Confirmation {...settings1} />);

    expect(screen.getByTestId('dialog-container')).toBeInTheDocument();
    expect(screen.getByText('Test topic')).toBeInTheDocument();
    expect(screen.getByText('Text1')).toBeInTheDocument();
    expect(screen.getByText('Text2')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-progress1')).toHaveStyle('width: 21%');
    expect(screen.getByTestId('dialog-progress2')).toHaveStyle('width: 79%');
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(window.getComputedStyle(screen.getByTestId('dialog-spinner'), null).opacity).toBe('0');

    rerender(<Confirmation {...settings2} />);

    expect(screen.getByTestId('dialog-container')).toBeInTheDocument();
    expect(screen.getByText('Test topic2')).toBeInTheDocument();
    expect(screen.getByText('Text12')).toBeInTheDocument();
    expect(screen.getByText('Text22')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-progress1')).toHaveStyle('width: 88%');
    expect(screen.getByTestId('dialog-progress2')).toHaveStyle('width: 99%');
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(window.getComputedStyle(screen.getByTestId('dialog-spinner'), null).opacity).toBe('1');

    fireEvent.click(screen.getByText('OK'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(okClick).toBeCalledTimes(1);
    expect(cancelClick).toBeCalledTimes(1);

    // empty object will fade out and close the dialog
    rerender(<Confirmation {...emptySettings} />);

    // after 150ms dialog is fading out with class 'dialog-exit-active'
    await wait(150);
    expect(
      screen.getByTestId('transition-dialog').classList.contains('dialog-exit-active')
    ).toBeTruthy();

    // after another 150ms dialog is removed from DOM
    await wait(150);
    expect(screen.queryByTestId('transition-dialog')).not.toBeDefined;
  });

  test('rendering just topic, message and ok button', async () => {
    const okClick = jest.fn();

    const settings: ConfirmationProps = {
      open: true,
      topic: 'Test topic',
      text: 'Text1',
      handleOk: okClick,
    };

    render(<Confirmation {...settings} />);

    expect(screen.getByTestId('dialog-container')).toBeInTheDocument();
    expect(screen.getByText('Test topic')).toBeInTheDocument();
    expect(screen.getByText('Text1')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(window.getComputedStyle(screen.getByTestId('dialog-spinner'), null).opacity).toBe('0');

    expect(screen.queryByText('Text2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-progress1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-progress2')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
