import { HeroCarousel, Slide } from '../components/HeroCarousel';
import { ContentCard } from '../components/ContentCard';
import { Palette, Map, Users, Building } from 'lucide-react';

const heroSlides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1576469197040-d06a796697cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5lenVlbGElMjBsYWtlJTIwbGFuZHNjYXBlJTIwc3Vuc2V0fGVufDF8fHx8MTc4MDAyODAzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Bienvenido a Tacarigua Digital',
    subtitle: 'Descubre la riqueza cultural e histórica de nuestra región'
  },
  {
    image: 'https://images.unsplash.com/photo-1643238974302-381f0fbd8211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbmlhbCUyMGFyY2hpdGVjdHVyZSUyMHZlbmV6dWVsYSUyMHRvd258ZW58MXx8fHwxNzgwMDI4MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Patrimonio Histórico',
    subtitle: 'Explora nuestras tradiciones y arquitectura colonial'
  },
  {
    image: 'https://images.unsplash.com/photo-1585607344893-43a4bd91169a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGN1bHR1cmFsJTIwZmVzdGl2YWwlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3ODAwMjgwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Cultura Viva',
    subtitle: 'Celebramos nuestras festividades y expresiones artísticas'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{
        background: 'linear-gradient(135deg, rgba(244, 241, 222, 0.3) 0%, rgba(255, 255, 255, 0.5) 100%)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-6 py-2 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                color: 'var(--oxford-navy)',
                fontWeight: '700',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Descubre
            </div>
            <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
              Explora Tacarigua
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
              Conoce nuestra cultura, geografía, historia y servicios comunitarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContentCard
              image="https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBjdWx0dXJlJTIwZXhoaWJpdHxlbnwxfHx8fDE3ODAwMjgxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              title="Cultura"
              description="Tradiciones, festividades, gastronomía y expresiones artísticas de Tacarigua"
              icon={<Palette size={24} />}
            />
            <ContentCard
              image="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbnMlMjBnZW9ncmFwaHklMjB0ZXJyYWluJTIwbmF0dXJlfGVufDF8fHx8MTc4MDAyODEwMnww&ixlib=rb-4.1.0&q=80&w=1080"
              title="Geografía"
              description="Conoce el territorio, clima y recursos naturales de nuestra región"
              icon={<Map size={24} />}
            />
            <ContentCard
              image="https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBlZHVjYXRpb24lMjBsZWFybmluZ3xlbnwxfHx8fDE3ODAwMjgxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              title="Sociedad"
              description="Servicios de salud, educación, deportes e historia comunitaria"
              icon={<Users size={24} />}
            />
            <ContentCard
              image="https://images.unsplash.com/photo-1627666338597-ce13e208a93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzgwMDI4MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              title="Nosotros"
              description="Historia, valores y misión de Tacarigua Digital"
              icon={<Building size={24} />}
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-block px-4 py-1.5 rounded-full mb-5"
                style={{
                  background: 'rgba(218, 165, 32, 0.15)',
                  color: 'var(--copper)',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Nuestra Misión
              </div>
              <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
                Tu Portal Cultural Digital
              </h2>
              <p className="mb-5 text-lg leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.8 }}>
                Tacarigua Digital es una plataforma moderna que preserva y promueve el patrimonio cultural,
                histórico y social de la región de Tacarigua.
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
                Nuestra misión es conectar a la comunidad con sus raíces, facilitando el acceso a información
                sobre cultura, geografía, servicios y eventos que definen nuestra identidad regional.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div
                  className="text-center p-6 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.05), rgba(218, 165, 32, 0.05))',
                    border: '2px solid rgba(218, 165, 32, 0.2)',
                    transition: 'var(--transicion-suave)'
                  }}
                >
                  <div className="text-4xl mb-2" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>500+</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Artículos</div>
                </div>
                <div
                  className="text-center p-6 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.05), rgba(218, 165, 32, 0.05))',
                    border: '2px solid rgba(218, 165, 32, 0.2)',
                    transition: 'var(--transicion-suave)'
                  }}
                >
                  <div className="text-4xl mb-2" style={{ color: 'var(--copper)', fontWeight: '700' }}>50+</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Lugares</div>
                </div>
                <div
                  className="text-center p-6 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.05), rgba(218, 165, 32, 0.05))',
                    border: '2px solid rgba(218, 165, 32, 0.2)',
                    transition: 'var(--transicion-suave)'
                  }}
                >
                  <div className="text-4xl mb-2" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>24/7</div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Acceso</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -top-6 -left-6 w-full h-full rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                  opacity: 0.1,
                  zIndex: 0
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1741272689174-f7f03b09a0ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2UlMjBjb3N0dW1lfGVufDF8fHx8MTc4MDAyODEwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cultura de Tacarigua"
                className="relative w-full h-[450px] object-cover rounded-2xl"
                style={{
                  boxShadow: '0 20px 50px rgba(29, 53, 87, 0.2)',
                  border: '4px solid white',
                  zIndex: 1
                }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))',
                  boxShadow: '0 8px 24px rgba(218, 165, 32, 0.4)',
                  zIndex: 2
                }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--oxford-navy)' }}>200+</div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--oxford-navy)' }}>Años</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
