import { screen } from '@testing-library/react';
import { render } from './../TestUtil';
import App from './App';

describe('App', () => {
  test('renders App', () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
