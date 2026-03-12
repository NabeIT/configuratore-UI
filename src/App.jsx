import { useCallback, useEffect, useState } from 'react';

import ConfiguratorView from './components/ConfiguratorView';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import catalogItems from './data/catalogItems';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  // URL del configuratore 3D — lasciare vuoto per mostrare il placeholder
  const iframeSrc = 'http://localhost:5173?embed=true';

  const handleDragStart = useCallback((e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';

    // Attiva l'overlay sull'iframe durante il drag
    document.querySelectorAll('[data-drag-overlay]').forEach((el) => {
      el.style.pointerEvents = 'auto';
    });
  }, []);

  // Disattiva l'overlay quando il drag termina (drop fuori, Esc, ecc.)
  useEffect(() => {
    const resetOverlay = () => {
      document.querySelectorAll('[data-drag-overlay]').forEach((el) => {
        el.style.pointerEvents = 'none';
      });
    };
    document.addEventListener('dragend', resetOverlay);
    return () => document.removeEventListener('dragend', resetOverlay);
  }, []);



  const handleIncrement = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity: ci.quantity + 1 } : ci))
    );
  }, []);

  const handleDecrement = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((ci) => (ci.id === id ? { ...ci, quantity: ci.quantity - 1 } : ci))
        .filter((ci) => ci.quantity > 0)
    );
  }, []);

  const handleClose = useCallback(() => {
    window.close();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header onClose={handleClose} />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar items={catalogItems} onDragStart={handleDragStart} />
        <ConfiguratorView iframeSrc={iframeSrc} items={catalogItems} />
        <RightSidebar
          cartItems={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
}
