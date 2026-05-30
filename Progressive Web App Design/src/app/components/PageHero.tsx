interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  badge?: string;
}

export function PageHero({ title, subtitle, backgroundImage, badge }: PageHeroProps) {
  return (
    <div
      className="relative h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative text-center px-4 z-10 max-w-4xl mx-auto">
        {badge && (
          <div
            className="inline-block px-6 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
              color: 'var(--oxford-navy)',
              fontWeight: '700',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: '0 4px 16px rgba(218, 165, 32, 0.4)'
            }}
          >
            {badge}
          </div>
        )}
        <h1
          className="mb-6"
          style={{
            color: 'var(--cream)',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {title}
        </h1>
        <p
          className="text-xl md:text-2xl leading-relaxed"
          style={{
            color: 'var(--cream)',
            opacity: 0.95,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}
        >
          {subtitle}
        </p>
        <div
          className="mt-6 h-1 w-32 mx-auto rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))'
          }}
        />
      </div>

      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(90deg, var(--goldenrod) 0%, var(--copper) 50%, var(--goldenrod) 100%)'
        }}
      />
    </div>
  );
}
