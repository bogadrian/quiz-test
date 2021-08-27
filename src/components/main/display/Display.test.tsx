import { screen } from '@testing-library/react';
import { render } from '../../../../TestUtil';
import { Display } from './Display';

describe('Display', () => {
  test('renders Display', () => {
    render(
      <Display
        answers={[{ question: '', anse: '', correct: true, difficulty: '' }]}
      />
    );
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();
  });
});
