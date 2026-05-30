import { TabNavigation, Tab } from '../components/TabNavigation';
import { PageHero } from '../components/PageHero';
import { Clock, Heart, BookOpen, Trophy } from 'lucide-react';

export default function Sociedad() {
  const historyContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-4" style={{ color: 'var(--oxford-navy)' }}>
            Orígenes y Evolución
          </h3>
          <p className="mb-4 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            La región de Tacarigua tiene sus raíces en los asentamientos indígenas que habitaron estas tierras 
            hace siglos. El nombre "Tacarigua" proviene de la lengua cumanagoto y significa "lago grande" o 
            "lugar de muchas aguas".
          </p>
          <p className="opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            Durante la época colonial, la región se convirtió en un importante centro agrícola y comercial, 
            estableciendo las bases de la comunidad que conocemos hoy.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1627666338597-ce13e208a93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Historia de Tacarigua"
            className="w-full h-64 object-cover rounded-xl"
            style={{ boxShadow: 'var(--sombra-premium)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { year: 'Siglo XVI', event: 'Primeros asentamientos coloniales' },
          { year: 'Siglo XIX', event: 'Consolidación como centro regional' },
          { year: 'Siglo XX', event: 'Modernización e industrialización' }
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl"
            style={{ background: 'var(--bg-glass)', border: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <div className="text-xl mb-2" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>
              {item.year}
            </div>
            <p className="text-sm opacity-80" style={{ color: 'var(--oxford-navy)' }}>
              {item.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const healthContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1764885415563-8b868745e9e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Servicios de Salud"
            className="w-full h-64 object-cover rounded-xl"
            style={{ boxShadow: 'var(--sombra-premium)' }}
          />
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--oxford-navy)' }}>
            <Heart size={28} style={{ color: 'var(--goldenrod)' }} />
            Sistema de Salud
          </h3>
          <p className="mb-4 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            Tacarigua cuenta con una red de servicios de salud que incluye hospitales, clínicas y centros 
            de atención primaria distribuidos estratégicamente en toda la región.
          </p>
          <ul className="space-y-2">
            {[
              '3 hospitales principales',
              '15 ambulatorios y clínicas',
              'Programas de prevención comunitaria',
              'Servicios de emergencia 24/7'
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
  );

  const educationContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--oxford-navy)' }}>
            <BookOpen size={28} style={{ color: 'var(--goldenrod)' }} />
            Educación
          </h3>
          <p className="mb-4 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            El sistema educativo de Tacarigua ofrece formación desde preescolar hasta universitaria, 
            garantizando el acceso a educación de calidad para toda la comunidad.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <div className="text-3xl mb-1" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>45</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--oxford-navy)' }}>Escuelas</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <div className="text-3xl mb-1" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>12</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--oxford-navy)' }}>Liceos</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <div className="text-3xl mb-1" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>3</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--oxford-navy)' }}>Universidades</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: 'var(--bg-glass)' }}>
              <div className="text-3xl mb-1" style={{ color: 'var(--goldenrod)', fontWeight: '700' }}>8</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--oxford-navy)' }}>Bibliotecas</div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Educación en Tacarigua"
            className="w-full h-64 object-cover rounded-xl"
            style={{ boxShadow: 'var(--sombra-premium)' }}
          />
        </div>
      </div>
    </div>
  );

  const sportsContent = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1517747614396-d21a78b850e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
            alt="Deportes en Tacarigua"
            className="w-full h-64 object-cover rounded-xl"
            style={{ boxShadow: 'var(--sombra-premium)' }}
          />
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--oxford-navy)' }}>
            <Trophy size={28} style={{ color: 'var(--goldenrod)' }} />
            Deportes y Recreación
          </h3>
          <p className="mb-4 opacity-80" style={{ color: 'var(--oxford-navy)' }}>
            Tacarigua promueve la actividad física y el deporte como pilares fundamentales del bienestar 
            comunitario, con instalaciones modernas y programas para todas las edades.
          </p>
          <div className="space-y-3">
            {[
              'Estadio municipal de fútbol',
              'Polideportivo con canchas múltiples',
              'Piscina olímpica',
              'Gimnasios comunitarios',
              'Canchas de baloncesto y tenis',
              'Ligas deportivas juveniles y adultas'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Trophy size={16} style={{ color: 'var(--goldenrod)', marginTop: '4px', flexShrink: 0 }} />
                <span className="opacity-80" style={{ color: 'var(--oxford-navy)' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const tabs: Tab[] = [
    {
      id: 'historia',
      label: 'Historia',
      content: historyContent
    },
    {
      id: 'sanidad',
      label: 'Sanidad',
      content: healthContent
    },
    {
      id: 'educacion',
      label: 'Educación',
      content: educationContent
    },
    {
      id: 'deportes',
      label: 'Deportes',
      content: sportsContent
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <PageHero
        title="Sociedad de Tacarigua"
        subtitle="Historia, servicios y calidad de vida de nuestra comunidad"
        backgroundImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        badge="Comunidad y Servicios"
      />

      {/* Tabs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
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
              Conoce Más
            </div>
            <h2 className="mb-6" style={{ color: 'var(--oxford-navy)' }}>
              Aspectos de Nuestra Sociedad
            </h2>
          </div>
          <TabNavigation tabs={tabs} />
        </div>
      </section>
    </div>
  );
}
