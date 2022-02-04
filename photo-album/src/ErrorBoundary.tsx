import React, { Component, ErrorInfo, ReactNode } from 'react';
import Message from './components/Message';

interface Props {
  children: ReactNode;
}
class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <Message text="An error occured" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
