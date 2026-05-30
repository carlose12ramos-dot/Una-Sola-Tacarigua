import { ReactNode } from 'react';

interface ContentCardProps {
  image: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export function ContentCard({ image, title, description, icon }: ContentCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all cursor-pointer group relative"
      style={{
        border: '2px solid transparent',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'var(--transicion-suave)',
        background: '#fff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(29, 53, 87, 0.15)';
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = 'var(--goldenrod)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(29, 53, 87, 0.7) 0%, transparent 60%)'
          }}
        />
        {icon && (
          <div
            className="absolute top-4 right-4 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
              color: 'var(--oxford-navy)',
              boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)'
            }}
          >
            {icon}
          </div>
        )}
        {/* Accent bar */}
        <div
          className="absolute bottom-0 left-0 w-full h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{
            background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))'
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 relative">
        <h3 className="mb-3 group-hover:text-goldenrod transition-colors" style={{ color: 'var(--oxford-navy)' }}>
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
          {description}
        </p>
        {/* Read more indicator */}
        <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--goldenrod)' }}>
            Explorar
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: 'var(--goldenrod)' }}
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
