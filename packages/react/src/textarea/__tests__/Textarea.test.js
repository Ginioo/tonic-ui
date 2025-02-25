import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Textarea } from '@tonic-ui/react/src';
import React from 'react';

describe('Textarea', () => {
  it('should render correctly', async () => {
    const variants = ['outline', 'filled', 'unstyled'];
    const renderOptions = {};
    const { container } = render((
      <>
        {variants.map(variant => (
          <Textarea
            data-testid={`textarea-${variant}`}
            key={`textarea-${variant}`}
            variant={variant}
          />
        ))}
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  it('should render correctly with disabled attribute', async () => {
    const { container } = render(
      <Textarea data-testid="textarea" disabled />
    );
    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render correctly with error attributes', async () => {
    const { container } = render(
      <Textarea data-testid="textarea" error />
    );
    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render correctly with readonly attributes', async () => {
    const { container } = render(
      <Textarea data-testid="textarea" readOnly />
    );
    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render correctly with required attributes', async () => {
    const { container } = render(
      <Textarea data-testid="textarea" required />
    );
    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-required', 'true');
  });

  it('should call the onChange function', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Textarea data-testid="textarea" onChange={onChange} />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveDisplayValue('');
    await user.type(textarea, 'hello');
    expect(onChange).toHaveBeenCalledWith(expect.anything());
    expect(textarea).toHaveDisplayValue('hello');
  });

  it('should match the border color', async () => {
    const user = userEvent.setup();
    render(
      <Textarea data-testid="textarea" />
    );
    const textarea = screen.getByTestId('textarea');
    const defaultBorderColor = 'var(--tonic-colors-gray-60)'; // [dark] gray:60 / [light] gray:30
    const focusBorderColor = 'var(--tonic-colors-blue-60)'; // [dark] blue:60 / [light] blue:60
    const hoverBorderColor = 'var(--tonic-colors-blue-50)'; // [dark] blue:50 / [light] blue:50

    expect(textarea).toBeValid();
    expect(document.body).toHaveFocus();

    await user.unhover(textarea);
    expect(textarea).toHaveStyleRule('border-color', defaultBorderColor);

    await user.hover(textarea);
    // XXX: Have to use `[data-hover]` to pass the assertion test
    expect(textarea).toHaveStyleRule('border-color', hoverBorderColor, { target: '[data-hover]' });

    await user.click(textarea);
    await user.unhover(textarea);
    expect(textarea).toHaveFocus();
    expect(textarea).toHaveStyleRule('border-color', focusBorderColor, { target: ':focus' });
  });
});
