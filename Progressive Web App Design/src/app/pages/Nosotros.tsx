import { Clock, Target, Heart, Award } from 'lucide-react';

export default function Nosotros() {
  const timelineEvents = [
    { year: '1850', title: 'Fundación', description: 'Se establecen los primeros asentamientos en la región' },
    { year: '1920', title: 'Desarrollo', description: 'Crecimiento económico y cultural de Tacarigua' },
    { year: '1980', title: 'Modernización', description: 'Mejoras en infraestructura y servicios públicos' },
    { year: '2020', title: 'Era Digital', description: 'Lanzamiento de Tacarigua Digital' },
  ];

  const values = [
    { icon: <Heart size={32} />, title: 'Comunidad', description: 'Unimos a los habitantes de Tacarigua' },
    { icon: <Target size={32} />, title: 'Innovación', description: 'Tecnología al servicio de la cultura' },
    { icon: <Award size={32} />, title: 'Excelencia', description: 'Calidad en cada contenido que compartimos' },
    { icon: <Clock size={32} />, title: 'Accesibilidad', description: 'Información disponible 24/7' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <div
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--oxford-navy) 0%, #2a4a75 50%, var(--copper) 100%)'
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, var(--goldenrod) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--copper) 0%, transparent 50%)'
          }}
        />
        <div className="text-center px-4 relative z-10">
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
            Quiénes Somos
          </div>
          <h1 className="mb-6" style={{ color: 'var(--cream)', textShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
            Sobre Nosotros
          </h1>
          <p className="text-2xl max-w-3xl mx-auto" style={{ color: 'var(--cream)', opacity: 0.95, textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
            Conectando el pasado con el futuro de Tacarigua
          </p>
          <div
            className="mt-6 h-1 w-32 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))'
            }}
          />
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-2"
          style={{
            background: 'linear-gradient(90deg, var(--goldenrod) 0%, var(--copper) 50%, var(--goldenrod) 100%)'
          }}
        />
      </div>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(218, 165, 32, 0.15)',
              color: 'var(--copper)',
              fontWeight: '700',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Nuestra Esencia
          </div>
          <h2 className="mb-8" style={{ color: 'var(--oxford-navy)' }}>
            Nuestra Misión
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.8 }}>
            Preservar y promover el patrimonio cultural, histórico y social de Tacarigua a través de una
            plataforma digital moderna, accesible e innovadora.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
            Facilitamos el acceso a información relevante sobre nuestra región, fortaleciendo la identidad
            comunitaria y conectando a las nuevas generaciones con sus raíces.
          </p>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.03) 0%, rgba(218, 165, 32, 0.05) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="mb-4" style={{ color: 'var(--oxford-navy)' }}>
              Nuestros Valores
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))'
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl transition-all"
                style={{
                  background: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  border: '2px solid',
                  borderColor: 'transparent',
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(29, 53, 87, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--goldenrod)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                    color: 'var(--oxford-navy)',
                    boxShadow: '0 6px 20px rgba(218, 165, 32, 0.4)'
                  }}
                >
                  {value.icon}
                </div>
                <h3 className="mb-3" style={{ color: 'var(--oxford-navy)' }}>
                  {value.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12" style={{ color: 'var(--oxford-navy)' }}>
            Nuestra Historia
          </h2>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{
                      background: 'var(--oxford-navy)',
                      color: 'var(--color-texto-inverso)',
                      fontWeight: '700',
                      fontSize: '0.875rem'
                    }}
                  >
                    {event.year}
                  </div>
                  {index !== timelineEvents.length - 1 && (
                    <div
                      className="w-0.5 h-16 mx-auto"
                      style={{ background: 'var(--goldenrod)' }}
                    />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="mb-2" style={{ color: 'var(--oxford-navy)' }}>
                    {event.title}
                  </h3>
                  <p className="opacity-80" style={{ color: 'var(--oxford-navy)' }}>
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
