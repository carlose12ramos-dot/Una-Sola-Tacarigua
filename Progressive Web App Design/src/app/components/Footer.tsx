import { Link } from 'react-router';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="mt-auto relative"
      style={{
        background: 'linear-gradient(to bottom, var(--oxford-navy) 0%, #0f1f33 100%)',
        borderTop: '4px solid var(--goldenrod)',
        boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, var(--goldenrod), var(--copper))'
                }}
              >
                <span className="font-bold text-lg" style={{ color: 'var(--oxford-navy)' }}>T</span>
              </div>
              <h3 style={{ color: 'var(--cream)' }}>
                Una Sola Tacarigua
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--cream)', opacity: 0.85 }}>
              Tu portal digital para descubrir la rica cultura, historia y servicios de la región de Tacarigua.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(244, 241, 222, 0.1)',
                  color: 'var(--cream)',
                  border: '2px solid transparent',
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--goldenrod), var(--copper))';
                  e.currentTarget.style.color = 'var(--oxford-navy)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--goldenrod)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 241, 222, 0.1)';
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(244, 241, 222, 0.1)',
                  color: 'var(--cream)',
                  border: '2px solid transparent',
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--goldenrod), var(--copper))';
                  e.currentTarget.style.color = 'var(--oxford-navy)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--goldenrod)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 241, 222, 0.1)';
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(244, 241, 222, 0.1)',
                  color: 'var(--cream)',
                  border: '2px solid transparent',
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, var(--goldenrod), var(--copper))';
                  e.currentTarget.style.color = 'var(--oxford-navy)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--goldenrod)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(244, 241, 222, 0.1)';
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5" style={{ color: 'var(--cream)' }}>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {['Inicio', 'Nosotros', 'Cultura', 'Geografía', 'Sociedad'].map((label, index) => {
                const paths = ['/', '/nosotros', '/cultura', '/geografia', '/sociedad'];
                return (
                  <li key={index}>
                    <Link
                      to={paths[index]}
                      className="text-sm transition-all inline-flex items-center space-x-2 group"
                      style={{
                        color: 'var(--cream)',
                        transition: 'var(--transicion-suave)',
                        opacity: 0.8
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--goldenrod)';
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--cream)';
                        e.currentTarget.style.opacity = '0.8';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5" style={{ color: 'var(--cream)' }}>
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} style={{ color: 'var(--goldenrod)', marginTop: '2px', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                  Región de Tacarigua, Venezuela
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} style={{ color: 'var(--goldenrod)', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                  +58 (000) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} style={{ color: 'var(--goldenrod)', flexShrink: 0 }} />
                <span className="text-sm" style={{ color: 'var(--cream)', opacity: 0.85 }}>
                  info@tacariguadigital.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-8" style={{ borderColor: 'rgba(218, 165, 32, 0.2)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm" style={{ color: 'var(--cream)', opacity: 0.7 }}>
              © 2026 Una Sola Tacarigua. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm transition-all"
                style={{
                  color: 'var(--cream)',
                  opacity: 0.7,
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--goldenrod)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.opacity = '0.7';
                }}
              >
                Privacidad
              </a>
              <a
                href="#"
                className="text-sm transition-all"
                style={{
                  color: 'var(--cream)',
                  opacity: 0.7,
                  transition: 'var(--transicion-suave)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--goldenrod)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--cream)';
                  e.currentTarget.style.opacity = '0.7';
                }}
              >
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
