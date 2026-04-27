import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-gray-400 max-w-xl mb-8">We apologize for the inconvenience. An unexpected error occurred.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-brand-red text-white font-medium rounded hover:scale-105 transition-transform"
          >
            Return to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
