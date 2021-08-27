import React from 'react';
import './error.scss';

interface Props {}

export class ErrorBoundary extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if ((this as any).state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container-overlay-error">
          <div className="container-error">
            <div className="container-text">Something went wrong!</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
