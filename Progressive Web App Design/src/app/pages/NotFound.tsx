import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div
        className="text-center p-12 rounded-2xl max-w-md"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(var(--blur-glass))',
          boxShadow: 'var(--sombra-premium)'
        }}
      >
        <div className="text-8xl mb-4" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>
          404
        </div>
        <h2 className="mb-4" style={{ color: 'var(--oxford-navy)' }}>
          Página No Encontrada
        </h2>
        <p className="mb-8 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <PrimaryButton icon={<Home size={20} />}>
            Volver al Inicio
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
