import { render } from '@testing-library/react';
import { ErrorBoundary } from './Error';

const renderProviders = (ui: React.ReactElement) => render(ui, {});

const Child = () => {
  throw new Error();
};

describe('Error Boundray', () => {
  it('shuold render error boundray componnet when there is a error', () => {
    const { getByText } = renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );
    const errorMessage = getByText(/Something went wrong/);
    expect(errorMessage).toBeDefined();
  });
});
