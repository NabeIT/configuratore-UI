import { useCallback, useEffect, useState } from 'react';

import ConfiguratorView from './components/ConfiguratorView';
import Header from './components/Header';
import { ItemActions } from './components/ItemActions';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import StartupModal from './components/StartupModal';
import catalogItems from './data/catalogItems';

function collectCatalogMeta(items, map = new Map()) {
  if (!Array.isArray(items)) return map;

  items.forEach((item) => {
    if (!item || typeof item !== 'object') return;

    if (item.model && !map.has(item.model)) {
      map.set(item.model, {
        title: item.title || item.name || item.model,
        description: item.description || '',
        image: item.image || `/assets/img/thumbs/${item.model}.png`,
      });
    }

    if (Array.isArray(item.items)) {
      collectCatalogMeta(item.items, map);
    }

    if (Array.isArray(item.variants)) {
      item.variants.forEach((variant) => {
        if (variant?.items) {
          collectCatalogMeta(variant.items, map);
        }
      });
    }
  });

  return map;
}

function collectCartSourceItems(items) {
  if (!Array.isArray(items)) return [];

  return items.reduce((acc, item) => {
    if (!item || typeof item !== 'object') return acc;

    if (item.model && item.type !== 'object' && (!item.meta || item.meta.inCart === undefined || item.meta?.inCart)) {
      acc.push(item);
    }

    if (item.type === 'object' && Array.isArray(item.items)) {
      acc.push(...collectCartSourceItems(item.items));
    }

    return acc;
  }, []);
}

const catalogMetaByModel = collectCatalogMeta(catalogItems);

function buildCartItems(sceneItems) {
  const groupedByModel = new Map();
  const sourceItems = collectCartSourceItems(sceneItems);

  console.log("Source items", sourceItems);
  sourceItems.forEach((item) => {
    const modelKey = item.model || item.id;
    if (!modelKey) return;

    const existing = groupedByModel.get(modelKey);
    if (existing) {

      existing.quantity += 1;
      if (item.id) existing.itemIds.push(item.id);
      return;
    }

    const catalogMeta = item.model ? catalogMetaByModel.get(item.model) : null;
    groupedByModel.set(modelKey, {
      id: modelKey,
      model: item.model || modelKey,
      title: item.name || item.title || catalogMeta?.title || modelKey,
      description: item.description || catalogMeta?.description || '',
      image: item.image || catalogMeta?.image || (item.model ? `/assets/img/thumbs/${item.model}.png` : ''),
      quantity: 1,
      itemIds: item.id ? [item.id] : [],
      meta: item?.meta
    });
  });

  return Array.from(groupedByModel.values()).sort((a, b) =>
    a.title.localeCompare(b.title, 'it', { sensitivity: 'base' })
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [quickAddRequest, setQuickAddRequest] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [showStartup, setShowStartup] = useState(true);
  const [presetRequest, setPresetRequest] = useState(null);

  const handlePresetSelect = useCallback((preset) => {
    setShowStartup(false);
    setPresetRequest({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      preset,
    });
  }, []);

  // URL del configuratore 3D — lasciare vuoto per mostrare il placeholder
  const iframeSrc = 'http://localhost:5173?embed=true';
  // const iframeSrc = 'https://configuratore-libreria-4b8v.vercel.app?_vercel_share=wkHppnLmnO6vb7jJopgrm28VGoQwiZXh&embed=true';
  // const iframeSrc = 'https://configuratore-libreria-4b8v.vercel.app?_vercel_share=wkHppnLmnO6vb7jJopgrm28VGoQwiZXh&embed=true';


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

  const handleSceneState = useCallback((sceneItems) => {
    setCartItems(buildCartItems(sceneItems));
  }, []);

  const handleQuickAdd = useCallback((item) => {
    setQuickAddRequest({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      item,
    });
  }, []);

  const handleClose = useCallback(() => {
    window.close();
  }, []);

  console.log('Selected item:', selectedItem);
  return (
    <div className="h-screen flex flex-col bg-white">
      <Header onClose={handleClose} />
      <div className="flex flex-1 overflow-hidden flex-col-reverse md:flex-row">
        <LeftSidebar items={catalogItems} onDragStart={handleDragStart} onQuickAdd={handleQuickAdd} catalogExpanded={catalogExpanded} setCatalogExpanded={setCatalogExpanded} />

        <ConfiguratorView
          iframeSrc={iframeSrc}
          items={catalogItems}
          setSelectedItem={setSelectedItem}
          onSceneState={handleSceneState}
          quickAddRequest={quickAddRequest}
          presetRequest={presetRequest}
        />

        <RightSidebar cartItems={cartItems} onAddToCart={(data) => {
          window.parent.postMessage({ type: 'add-to-cart', data }, '*');

        }} />

        {selectedItem && (
          <ItemActions item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}

        {showStartup && <StartupModal onSelect={handlePresetSelect} />}
      </div>
    </div>
  );
}
