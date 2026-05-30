import { WifiOff, RefreshCw } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface OfflinePlaceholderProps {
  onRetry?: () => void;
}

export function OfflinePlaceholder({ onRetry }: OfflinePlaceholderProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      style={{
        background: 'var(--bg-glass-oscuro)',
        backdropFilter: 'blur(var(--blur-glass))',
        borderRadius: '16px',
        margin: '2rem auto',
        maxWidth: '600px'
      }}
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{
          background: 'rgba(218, 165, 32, 0.2)',
          border: '2px solid var(--goldenrod)'
        }}
      >
        <WifiOff size={48} style={{ color: 'var(--goldenrod)' }} />
      </div>

      <h2 className="mb-4 text-center" style={{ color: 'var(--color-texto-inverso)' }}>
        Sin Conexión
      </h2>

      <p className="text-center mb-8 max-w-md" style={{ color: 'var(--color-texto-inverso)', opacity: 0.9 }}>
        Parece que no tienes conexión a Internet. Por favor, verifica tu conexión y vuelve a intentarlo.
      </p>

      <PrimaryButton onClick={handleRetry} icon={<RefreshCw size={20} />}>
        Reintentar
      </PrimaryButton>
    </div>
  );
}
