import { screen } from '@testing-library/react';
import { render } from '../../../../TestUtil';
import { DisplayUsers } from './DisplayUsers';

const fn = jest.fn();
describe('DisplayUsers', () => {
  test('renders DisplayUsers', () => {
    render(<DisplayUsers cleanAllStore={fn} />);
    expect(screen.queryByText(/Name:/i)).not.toBeInTheDocument();
  });
});
