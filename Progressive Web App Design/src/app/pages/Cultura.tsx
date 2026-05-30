import { ContentCard } from '../components/ContentCard';
import { PageHero } from '../components/PageHero';
import { Music, Utensils, Palette, Calendar } from 'lucide-react';

export default function Cultura() {
  const culturalItems = [
    {
      image: 'https://images.unsplash.com/photo-1619683257356-41a4fb1dbe87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5lenVlbGFuJTIwZm9vZCUyMHRyYWRpdGlvbmFsJTIwY3Vpc2luZXxlbnwxfHx8fDE3ODAwMjgxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Gastronomía',
      description: 'Descubre los sabores tradicionales de Tacarigua, desde arepas hasta hallacas y dulces típicos',
      icon: <Utensils size={24} />
    },
    {
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGluc3RydW1lbnRzJTIwZ3VpdGFyJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzgwMDI4MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Música Tradicional',
      description: 'Joropo, gaita y otras expresiones musicales que definen nuestra identidad cultural',
      icon: <Music size={24} />
    },
    {
      image: 'https://images.unsplash.com/photo-1698256179114-30758b66f70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHMlMjBoYW5kbWFkZSUyMHRyYWRpdGlvbmFsJTIwYXJ0aXNhbnxlbnwxfHx8fDE3ODAwMjgxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Artesanía',
      description: 'Trabajos en cerámica, tejidos y otras manifestaciones del arte popular local',
      icon: <Palette size={24} />
    },
    {
      image: 'https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGNlbGVicmF0aW9uJTIwY29sb3JmdWwlMjBwYXJhZGV8ZW58MXx8fHwxNzgwMDI4MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Festividades',
      description: 'Celebraciones religiosas y populares que reúnen a la comunidad año tras año',
      icon: <Calendar size={24} />
    },
    {
      image: 'https://images.unsplash.com/photo-1741272689174-f7f03b09a0ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2UlMjBjb3N0dW1lfGVufDF8fHx8MTc4MDAyODEwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Danzas Tradicionales',
      description: 'Bailes folklóricos que preservan la memoria histórica y cultural de nuestra región',
      icon: <Music size={24} />
    },
    {
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBjdWx0dXJlJTIwZXhoaWJpdHxlbnwxfHx8fDE3ODAwMjgxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Museos y Patrimonio',
      description: 'Espacios dedicados a preservar y exhibir nuestra historia y expresiones artísticas',
      icon: <Palette size={24} />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <PageHero
        title="Cultura de Tacarigua"
        subtitle="Tradiciones vivas que conectan generaciones"
        backgroundImage="https://images.unsplash.com/photo-1585607344893-43a4bd91169a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        badge="Patrimonio Cultural"
      />

      {/* Cultural Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="inline-block px-5 py-2 rounded-full mb-5"
              style={{
                background: 'rgba(218, 165, 32, 0.15)',
                color: 'var(--copper)',
                fontWeight: '700',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              Expresiones Culturales
            </div>
            <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
              Nuestro Legado Cultural
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--oxford-navy)', opacity: 0.75 }}>
              La cultura de Tacarigua es un mosaico de tradiciones, sabores, ritmos y expresiones artísticas
              que reflejan la identidad única de nuestra región.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalItems.map((item, index) => (
              <ContentCard
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: 'linear-gradient(135deg, rgba(29, 53, 87, 0.03) 0%, rgba(218, 165, 32, 0.05) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="mb-4" style={{ color: 'var(--oxford-navy)' }}>
              Patrimonio Cultural en Números
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))'
              }}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
              className="text-center p-8 rounded-2xl transition-all hover:scale-105"
              style={{
                background: 'white',
                border: '2px solid rgba(218, 165, 32, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                transition: 'var(--transicion-suave)'
              }}
            >
              <div className="text-5xl mb-3" style={{ color: 'var(--goldenrod)', fontWeight: '800' }}>25+</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Festividades</div>
            </div>
            <div
              className="text-center p-8 rounded-2xl transition-all hover:scale-105"
              style={{
                background: 'white',
                border: '2px solid rgba(218, 165, 32, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                transition: 'var(--transicion-suave)'
              }}
            >
              <div className="text-5xl mb-3" style={{ color: 'var(--copper)', fontWeight: '800' }}>100+</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Artesanos</div>
            </div>
            <div
              className="text-center p-8 rounded-2xl transition-all hover:scale-105"
              style={{
                background: 'white',
                border: '2px solid rgba(218, 165, 32, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                transition: 'var(--transicion-suave)'
              }}
            >
              <div className="text-5xl mb-3" style={{ color: 'var(--goldenrod)', fontWeight: '800' }}>15+</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Museos</div>
            </div>
            <div
              className="text-center p-8 rounded-2xl transition-all hover:scale-105"
              style={{
                background: 'white',
                border: '2px solid rgba(218, 165, 32, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                transition: 'var(--transicion-suave)'
              }}
            >
              <div className="text-5xl mb-3" style={{ color: 'var(--copper)', fontWeight: '800' }}>200+</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--oxford-navy)', opacity: 0.7 }}>Años de Historia</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
