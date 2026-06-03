import { Link, useLocation } from 'react-router';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/cultura', label: 'Cultura' },
    { path: '/geografia', label: 'Geografía' },
    { path: '/sociedad', label: 'Sociedad' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleInstall = () => {
    alert('Funcionalidad de instalación PWA - En producción, esto activaría el prompt de instalación nativa del navegador.');
  };

  return (
    <nav className="sticky top-0 z-50" style={{
      background: 'var(--oxford-navy)',
      boxShadow: 'var(--sombra-navbar)',
      borderBottom: '3px solid var(--goldenrod)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--goldenrod) 0%, var(--copper) 100%)',
                boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)',
                transition: 'var(--transicion-suave)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) rotate(-3deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <span
                className="font-bold relative z-10"
                style={{
                  fontSize: '1.75rem',
                  color: 'var(--oxford-navy)',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.2)'
                }}
              >
                T
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl block" style={{
                color: 'var(--cream)',
                transition: 'var(--transicion-suave)',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                Una Sola Tacarigua
              </span>
              <span className="text-xs tracking-wider" style={{
                color: 'var(--goldenrod)',
                opacity: 0.9
              }}>
                Cultura y Tradición
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-5 py-2.5 rounded-lg relative overflow-hidden"
                style={{
                  color: isActive(link.path) ? 'var(--oxford-navy)' : 'var(--cream)',
                  background: isActive(link.path) ? 'var(--goldenrod)' : 'transparent',
                  transition: 'var(--transicion-suave)',
                  fontWeight: isActive(link.path) ? '600' : '500',
                  borderBottom: isActive(link.path) ? 'none' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = 'rgba(244, 241, 222, 0.1)';
                    e.currentTarget.style.borderBottomColor = 'var(--copper)';
                    e.currentTarget.style.color = 'var(--goldenrod)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderBottomColor = 'transparent';
                    e.currentTarget.style.color = 'var(--cream)';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Install Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleInstall}
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--goldenrod) 0%, var(--copper) 100%)',
                color: 'var(--oxford-navy)',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(218, 165, 32, 0.3)',
                transition: 'var(--transicion-suave)',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(218, 165, 32, 0.5)';
                e.currentTarget.style.borderColor = 'var(--cream)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(218, 165, 32, 0.3)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              aria-label="Instalar aplicación"
            >
              <Download size={18} />
              <span>Instalar</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg transition-all"
              style={{
                color: 'var(--cream)',
                background: mobileMenuOpen ? 'rgba(244, 241, 222, 0.1)' : 'transparent',
                border: '2px solid',
                borderColor: mobileMenuOpen ? 'var(--goldenrod)' : 'transparent'
              }}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-2" style={{
            borderTop: '1px solid rgba(244, 241, 222, 0.2)',
            marginTop: '0.5rem'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg transition-all"
                style={{
                  color: isActive(link.path) ? 'var(--oxford-navy)' : 'var(--cream)',
                  background: isActive(link.path) ? 'var(--goldenrod)' : 'rgba(244, 241, 222, 0.05)',
                  transition: 'var(--transicion-suave)',
                  fontWeight: isActive(link.path) ? '600' : '500',
                  borderLeft: '3px solid',
                  borderLeftColor: isActive(link.path) ? 'var(--copper)' : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg mt-2"
              style={{
                background: 'linear-gradient(135deg, var(--goldenrod) 0%, var(--copper) 100%)',
                color: 'var(--oxford-navy)',
                fontWeight: '600',
                transition: 'var(--transicion-suave)'
              }}
              aria-label="Instalar aplicación"
            >
              <Download size={18} />
              <span>Instalar App</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
