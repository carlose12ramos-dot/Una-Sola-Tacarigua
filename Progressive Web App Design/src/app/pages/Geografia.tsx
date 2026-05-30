import { MapPin, Thermometer, Droplets, Mountain } from 'lucide-react';
import { GlassBadge } from '../components/GlassBadge';
import { PageHero } from '../components/PageHero';

export default function Geografia() {
  const geographicFeatures = [
    { icon: <Mountain size={20} />, label: 'Montañas', value: '1,200 msnm' },
    { icon: <Droplets size={20} />, label: 'Ríos', value: '5 principales' },
    { icon: <Thermometer size={20} />, label: 'Temperatura', value: '18-28°C' },
    { icon: <MapPin size={20} />, label: 'Extensión', value: '850 km²' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <PageHero
        title="Geografía de Tacarigua"
        subtitle="Conoce nuestro territorio y recursos naturales"
        backgroundImage="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        badge="Territorio y Naturaleza"
      />

      {/* Quick Stats */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, rgba(244, 241, 222, 0.2) 0%, rgba(255, 255, 255, 0.5) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {geographicFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl text-center transition-all"
                style={{
                  background: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                  border: '2px solid',
                  borderColor: 'transparent',
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(29, 53, 87, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--goldenrod)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                    color: 'var(--oxford-navy)',
                    boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)'
                  }}
                >
                  {feature.icon}
                </div>
                <div className="text-3xl mb-2" style={{ color: 'var(--oxford-navy)', fontWeight: '800' }}>
                  {feature.value}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>
                  {feature.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-8" style={{ color: 'var(--oxford-navy)' }}>
            Mapa Interactivo
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            Explora los diferentes municipios, pueblos y puntos de interés de la región de Tacarigua
          </p>

          {/* Placeholder Map */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: '500px',
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              boxShadow: 'var(--sombra-premium)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} style={{ color: 'var(--oxford-navy)', margin: '0 auto 1rem' }} />
                <h3 className="mb-2" style={{ color: 'var(--oxford-navy)' }}>
                  Mapa Interactivo
                </h3>
                <p className="opacity-70" style={{ color: 'var(--oxford-navy)' }}>
                  Funcionalidad de mapa próximamente
                </p>
              </div>
            </div>

            {/* Sample Badges */}
            <div className="absolute top-6 left-6">
              <GlassBadge icon={<MapPin size={16} />}>Centro Histórico</GlassBadge>
            </div>
            <div className="absolute bottom-6 right-6">
              <GlassBadge icon={<Mountain size={16} />}>Sierra Norte</GlassBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Climate & Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
                Clima
              </h2>
              <p className="mb-4 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
                Tacarigua goza de un clima tropical templado gracias a su altitud. Las temperaturas oscilan 
                entre 18°C y 28°C durante todo el año, con una época de lluvias de mayo a noviembre.
              </p>
              <p className="opacity-80" style={{ color: 'var(--oxford-navy)' }}>
                Esta diversidad climática permite una rica biodiversidad y la producción de diversos cultivos 
                agrícolas que sustentan la economía local.
              </p>
            </div>
            <div>
              <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
                Recursos Naturales
              </h2>
              <ul className="space-y-3">
                {[
                  'Recursos hídricos: 5 ríos principales y múltiples quebradas',
                  'Flora: Bosques tropicales y vegetación de montaña',
                  'Fauna: Diversidad de especies endémicas y migratorias',
                  'Suelos fértiles para agricultura y ganadería'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ background: 'var(--goldenrod)', flexShrink: 0 }}
                    />
                    <span className="opacity-80" style={{ color: 'var(--oxford-navy)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
