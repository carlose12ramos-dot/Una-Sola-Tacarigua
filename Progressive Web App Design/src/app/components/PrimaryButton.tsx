import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({ children, onClick, icon, fullWidth = false }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all ${
        fullWidth ? 'w-full' : ''
      }`}
      style={{
        background: 'var(--oxford-navy)',
        color: 'var(--color-texto-inverso)',
        transition: 'var(--transicion-suave)',
        fontWeight: '600'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--goldenrod)';
        e.currentTarget.style.color = 'var(--oxford-navy)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--oxford-navy)';
        e.currentTarget.style.color = 'var(--color-texto-inverso)';
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
