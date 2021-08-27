import { screen } from '@testing-library/react';
import { render } from './../../../../TestUtil';
import { Questions } from './Questions';

describe('Questions', () => {
  test('renders Questions', () => {
    render(<Questions />);
    expect(
      screen.queryByText(/Please answer these questions:/i)
    ).not.toBeInTheDocument();
  });
});
