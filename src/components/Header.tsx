import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToId } from '@/lib/analytics';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Sobre', id: 'sobre' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Palestras', id: 'palestras' },
    { label: 'Depoimentos', id: 'depoimentos' },
    { label: 'Contato', id: 'contato' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToId(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="bg-white/90 backdrop-blur-md border-b border-brand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-playfair text-xl sm:text-2xl text-brand-700 font-semibold hover:text-brand-800 transition-colors"
            >
              Sueli Custódio
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-ink-700 hover:text-brand-600 transition-smooth relative py-2 text-base font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-brand-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side: Mobile menu + CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-brand-700 hover:text-brand-800 transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* CTA Button */}
              <Button
                onClick={() => handleNavClick('contato')}
                className="bg-brand-600 hover:bg-brand-700 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition-all"
              >
                Agendar Sessão
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-100 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 text-ink-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors text-base font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
