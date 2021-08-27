import { screen } from '@testing-library/react';
import { render } from './../../../TestUtil';
import { ContainerMain } from './ContainerMain';

describe('ContainerMain', () => {
  test('renders ContainerMain', () => {
    render(<ContainerMain />);
    expect(screen.getByTestId('container-main')).toBeInTheDocument();
  });
});
