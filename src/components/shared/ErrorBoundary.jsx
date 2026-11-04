import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta?.env?.DEV);
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="text-red-500" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Algo salió mal
            </h2>
            <p className="text-gray-600 text-center mb-4 text-sm">
              Ha ocurrido un error al cargar este módulo. Haz clic en el botón para reiniciar el sistema.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  try {
                    localStorage.clear();
                  } catch (e) {
                    // ignore
                  }
                  window.location.href = '/';
                }}
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors font-medium text-sm"
              >
                Limpiar datos y volver al inicio
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-sm"
              >
                Reintentar
              </button>
            </div>
            {isDev && this.state.error && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48 border border-gray-200">
                <p className="font-bold text-red-600 mb-1">Detalles técnicos del error:</p>
                <pre className="text-[11px] text-gray-800 whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
