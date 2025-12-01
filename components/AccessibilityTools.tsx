import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  Contrast, 
  Eye, 
  Lightbulb, 
  Link as LinkIcon, 
  Type, 
  RotateCcw,
  X
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

// Símbolo Universal de Accesibilidad (ISA - International Symbol of Access)
const AccessibilityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Círculo de fondo */}
    <circle cx="50" cy="50" r="48" fill="currentColor" />
    {/* Persona en silla de ruedas - Símbolo ISA estándar */}
    <g fill="white">
      {/* Cabeza */}
      <circle cx="50" cy="22" r="7" />
      {/* Torso */}
      <rect x="47" y="29" width="6" height="20" rx="1" />
      {/* Brazo izquierdo */}
      <path d="M 47 35 Q 38 38 35 45" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Brazo derecho */}
      <path d="M 53 35 Q 62 38 65 45" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Piernas */}
      <rect x="47" y="49" width="3" height="8" />
      <rect x="50" y="49" width="3" height="8" />
      {/* Silla de ruedas - rueda izquierda */}
      <circle cx="32" cy="68" r="11" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="32" cy="68" r="3" fill="white" />
      {/* Silla de ruedas - rueda derecha */}
      <circle cx="68" cy="68" r="11" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="68" cy="68" r="3" fill="white" />
      {/* Asiento de la silla */}
      <rect x="40" y="55" width="20" height="3" rx="1" />
    </g>
  </svg>
);

export const AccessibilityTools: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    fontSize,
    contrastMode,
    linksUnderline,
    readableFont,
    increaseText,
    decreaseText,
    setContrastMode,
    toggleLinksUnderline,
    toggleReadableFont,
    resetAccessibility,
  } = useAccessibility();

  // Asegurar que el componente esté montado antes de usar portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar el panel al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-expanded="true"]')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const tools = [
    {
      id: 'increase-text',
      label: 'Aumentar Texto',
      icon: ZoomIn,
      action: increaseText,
      active: false,
    },
    {
      id: 'decrease-text',
      label: 'Disminuir Texto',
      icon: ZoomOut,
      action: decreaseText,
      active: false,
    },
    {
      id: 'grayscale',
      label: 'Escala de Grises',
      icon: Contrast,
      action: () => setContrastMode('grayscale'),
      active: contrastMode === 'grayscale',
    },
    {
      id: 'high-contrast',
      label: 'Alto Contraste',
      icon: Contrast,
      action: () => setContrastMode('high-contrast'),
      active: contrastMode === 'high-contrast',
    },
    {
      id: 'negative-contrast',
      label: 'Contraste Negativo',
      icon: Eye,
      action: () => setContrastMode('negative-contrast'),
      active: contrastMode === 'negative-contrast',
    },
    {
      id: 'light-background',
      label: 'Fondo Claro',
      icon: Lightbulb,
      action: () => setContrastMode('light-background'),
      active: contrastMode === 'light-background',
    },
    {
      id: 'links-underline',
      label: 'Subrayar Enlaces',
      icon: LinkIcon,
      action: toggleLinksUnderline,
      active: linksUnderline,
    },
    {
      id: 'readable-font',
      label: 'Fuente Legible',
      icon: Type,
      action: toggleReadableFont,
      active: readableFont,
    },
    {
      id: 'reset',
      label: 'Restablecer',
      icon: RotateCcw,
      action: resetAccessibility,
      active: false,
    },
  ];

  // Manejar acciones de herramientas sin cerrar el panel
  const handleToolAction = (action: () => void, toolId?: string) => {
    action();
    // El panel permanece abierto para permitir múltiples ajustes
    // Solo cerrar si es reset (opcional, pero mejora UX)
    if (toolId === 'reset') {
      // Pequeño delay para que el usuario vea el cambio antes de cerrar
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  // Renderizar usando portal para evitar problemas con filtros CSS
  if (!mounted) return null;

  const buttonElement = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="a11y-tool rounded-full shadow-2xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white p-4"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'transform',
        backgroundColor: isOpen ? '#15803d' : '#16a34a',
        isolation: 'isolate',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isOpen ? '#166534' : '#15803d';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isOpen ? '#15803d' : '#16a34a';
      }}
      aria-label={isOpen ? 'Cerrar herramientas de accesibilidad' : 'Abrir herramientas de accesibilidad'}
      aria-expanded={isOpen}
      title={isOpen ? 'Cerrar herramientas de accesibilidad' : 'Abrir herramientas de accesibilidad'}
      type="button"
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <AccessibilityIcon className="h-6 w-6" />
      )}
    </button>
  );

  const panelElement = isOpen ? (
    <div 
      ref={panelRef}
      className="a11y-tool w-64 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300"
      role="dialog"
      aria-label="Herramientas de accesibilidad"
      aria-modal="true"
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '1.5rem',
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'transform',
        isolation: 'isolate',
      }}
    >
          {/* Encabezado con botón de cerrar */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-start">
            <div className="flex-1">
              <h2 className="font-bold text-lg">Herramientas de Accesibilidad</h2>
              <p className="text-xs text-green-100 mt-1">
                Tamaño de texto: {fontSize}%
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-2 text-white hover:text-green-100 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
              aria-label="Cerrar panel de accesibilidad"
              title="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Lista de herramientas */}
          <div className="max-h-[500px] overflow-y-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolAction(tool.action, tool.id)}
                  className={`w-full px-4 py-3 flex items-center space-x-3 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 active:bg-gray-100 ${
                    tool.active ? 'bg-green-50 border-l-4 border-green-600' : ''
                  }`}
                  aria-label={tool.label}
                  aria-pressed={tool.active}
                  title={tool.label}
                  type="button"
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${
                    tool.active ? 'text-green-600' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    tool.active ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {tool.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
  ) : null;

  // Renderizar usando portal directamente en el body para evitar problemas con filtros
  return (
    <>
      {createPortal(buttonElement, document.body)}
      {panelElement && createPortal(panelElement, document.body)}
    </>
  );
};

