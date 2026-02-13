import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 max-w-2xl mx-auto mt-10 bg-white border border-red-200 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertCircle className="h-8 w-8" />
                        <h2 className="text-2xl font-bold">Something went wrong</h2>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md overflow-auto mb-4 border border-gray-200">
                        <p className="font-mono text-sm text-red-800 break-all">{this.state.error?.toString()}</p>
                    </div>
                    {this.state.errorInfo && (
                        <details className="mb-4">
                            <summary className="cursor-pointer text-gray-600 mb-2 font-medium">Component Stack Trace</summary>
                            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-60">
                                {this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
