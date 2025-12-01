import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ContrastMode = 'normal' | 'high-contrast' | 'negative-contrast' | 'grayscale' | 'light-background';

interface AccessibilityState {
  fontSize: number; // Porcentaje, base 100
  contrastMode: ContrastMode;
  linksUnderline: boolean;
  readableFont: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  increaseText: () => void;
  decreaseText: () => void;
  setContrastMode: (mode: ContrastMode) => void;
  toggleLinksUnderline: () => void;
  toggleReadableFont: () => void;
  resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const DEFAULT_STATE: AccessibilityState = {
  fontSize: 100,
  contrastMode: 'normal',
  linksUnderline: false,
  readableFont: false,
};

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AccessibilityState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing accessibility settings", e);
        }
      }
    }
    return DEFAULT_STATE;
  });

  // Aplicar estilos cuando el componente se monta y cuando cambia el estado
  useEffect(() => {
    applyAccessibilityStyles(state);
    localStorage.setItem('accessibility-settings', JSON.stringify(state));
  }, [state]);

  const applyAccessibilityStyles = (currentState: AccessibilityState) => {
    const root = document.documentElement;
    const body = document.body;

    // Font Size - aplicar al root para que afecte a todos los elementos
    // Usar setProperty para asegurar que se aplique correctamente
    if (currentState.fontSize === 100) {
      root.style.removeProperty('font-size');
    } else {
      root.style.setProperty('font-size', `${currentState.fontSize}%`, 'important');
    }
    
    // Reset todas las clases de accesibilidad primero (tanto en html como en body)
    root.classList.remove(
      'a11y-high-contrast', 
      'a11y-negative-contrast', 
      'a11y-grayscale', 
      'a11y-light-background'
    );
    
    body.classList.remove(
      'a11y-high-contrast', 
      'a11y-negative-contrast', 
      'a11y-grayscale', 
      'a11y-light-background',
      'a11y-links-underline',
      'a11y-readable-font'
    );

    // Aplicar modo de contraste (solo uno a la vez, mutuamente excluyentes)
    // Para filtros, aplicar en html; para otros estilos, en body
    if (currentState.contrastMode === 'high-contrast') {
      body.classList.add('a11y-high-contrast');
    } else if (currentState.contrastMode === 'negative-contrast') {
      root.classList.add('a11y-negative-contrast');
      body.classList.add('a11y-negative-contrast');
    } else if (currentState.contrastMode === 'grayscale') {
      root.classList.add('a11y-grayscale');
      body.classList.add('a11y-grayscale');
    } else if (currentState.contrastMode === 'light-background') {
      body.classList.add('a11y-light-background');
    }

    // Enlaces subrayados (puede combinarse con otros modos)
    if (currentState.linksUnderline) {
      body.classList.add('a11y-links-underline');
    }

    // Fuente legible (puede combinarse con otros modos)
    if (currentState.readableFont) {
      body.classList.add('a11y-readable-font');
    }
  };

  const increaseText = () => {
    setState(prev => ({ ...prev, fontSize: Math.min(prev.fontSize + 10, 200) }));
  };

  const decreaseText = () => {
    setState(prev => ({ ...prev, fontSize: Math.max(prev.fontSize - 10, 80) }));
  };

  const setContrastMode = (mode: ContrastMode) => {
    setState(prev => ({ 
      ...prev, 
      contrastMode: prev.contrastMode === mode ? 'normal' : mode 
    }));
  };

  const toggleLinksUnderline = () => {
    setState(prev => ({ ...prev, linksUnderline: !prev.linksUnderline }));
  };

  const toggleReadableFont = () => {
    setState(prev => ({ ...prev, readableFont: !prev.readableFont }));
  };

  const resetAccessibility = () => {
    // Limpiar estilos aplicados antes de resetear
    const root = document.documentElement;
    const body = document.body;
    
    root.style.removeProperty('font-size');
    body.classList.remove(
      'a11y-high-contrast', 
      'a11y-negative-contrast', 
      'a11y-grayscale', 
      'a11y-light-background',
      'a11y-links-underline',
      'a11y-readable-font'
    );
    
    // Resetear estado
    setState(DEFAULT_STATE);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        increaseText,
        decreaseText,
        setContrastMode,
        toggleLinksUnderline,
        toggleReadableFont,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

