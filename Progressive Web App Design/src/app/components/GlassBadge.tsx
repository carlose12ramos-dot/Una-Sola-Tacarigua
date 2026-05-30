import { ReactNode } from 'react';

interface GlassBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
}

export function GlassBadge({ children, icon }: GlassBadgeProps) {
  return (
    <div
      className="inline-flex items-center space-x-2 px-4 py-2 rounded-full"
      style={{
        background: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(var(--blur-glass))',
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '0.875rem',
        fontWeight: '500'
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
