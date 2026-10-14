import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Düşünce Defteri Yakalanan Hata:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem("thought_defteri_entries");
    localStorage.removeItem("thought_defteri_reflection");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FDFBF7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '460px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            border: '1px solid #E5E5EA',
            padding: '28px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>📖</div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1C1814', marginBottom: '8px' }}>
              Düşünce Defteri Açılırken Bir Aksamayla Karşılaşıldı
            </h2>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5, marginBottom: '16px' }}>
              Tarayıcıda önbelleğe alınmış eski bir veri veya bir bileşen başlatılamadı. Endişelenmeyin, aşağıdaki adımlarla düzeltebilirsiniz.
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: '#FFF9E5',
                border: '1px solid rgba(255, 214, 10, 0.4)',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#8D704E',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '16px',
                maxHeight: '100px'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#A2845E',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Sayfayı Yeniden Yükle
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  backgroundColor: '#F2F2F7',
                  color: '#555',
                  border: '1px solid #E5E5EA',
                  borderRadius: '14px',
                  padding: '10px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Önbelleği Sıfırla ve Yeniden Başlat
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
