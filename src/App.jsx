import { useCallback, useEffect, useState } from 'react';

import ConfiguratorView from './components/ConfiguratorView';
import Header from './components/Header';
import { ItemActions } from './components/ItemActions';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import StartupModal from './components/StartupModal';
import catalogItems from './data/catalogItems';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azrkvmypdhvxhaailnsv.supabase.co';
const supabaseKey = 'sb_publishable_Tvvx1UT8dNNpu3FK2enaSA_L9lMkfJO';
const supabase = createClient(supabaseUrl, supabaseKey);

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

const STRUCTURAL_SIDE_SKUS = new Set(['BARR36', 'BARR78', 'BARR78-80', 'BARR95']);
const ZERO_POSITION = [0, 0, 0];

function normalizePosition(position) {
  return Array.isArray(position)
    ? [Number(position[0]) || 0, Number(position[1]) || 0, Number(position[2]) || 0]
    : ZERO_POSITION;
}

function addPositions(a, b) {
  return [
    (Number(a?.[0]) || 0) + (Number(b?.[0]) || 0),
    (Number(a?.[1]) || 0) + (Number(b?.[1]) || 0),
    (Number(a?.[2]) || 0) + (Number(b?.[2]) || 0),
  ];
}

function getSidePositionKey(item, worldPosition) {
  const sku = item.meta?.sku || '';
  const model = item.model || '';
  const positionKey = normalizePosition(worldPosition)
    .map((value) => Math.round(value * 1000) / 1000)
    .join(':');

  return `${sku}:${model}:${positionKey}`;
}

function isStructuralSide(item) {
  return STRUCTURAL_SIDE_SKUS.has(item?.meta?.sku);
}

function collectCartSourceItems(items, parentPosition = ZERO_POSITION, sidePositionKeys = new Set()) {
  if (!Array.isArray(items)) return [];

  return items.reduce((acc, item) => {
    if (!item || typeof item !== 'object') return acc;

    const localPosition = normalizePosition(item.position);
    const worldPosition = Array.isArray(item.worldPosition)
      ? normalizePosition(item.worldPosition)
      : addPositions(parentPosition, localPosition);
    const structuralSide = isStructuralSide(item);

    if (item.model && item.type !== 'object') {
      if (structuralSide) {
        const sideKey = getSidePositionKey(item, worldPosition);
        if (!sidePositionKeys.has(sideKey)) {
          sidePositionKeys.add(sideKey);
          acc.push({
            ...item,
            cartWorldPosition: worldPosition,
            meta: {
              ...item.meta,
              inCart: true,
            },
          });
        }
      } else if (!item.hideFromCart && (!item.meta || item.meta.inCart === undefined || item.meta?.inCart)) {
        acc.push({
          ...item,
          cartWorldPosition: worldPosition,
        });
      }
    }

    if (item.type === 'object' && Array.isArray(item.items)) {
      acc.push(...collectCartSourceItems(item.items, worldPosition, sidePositionKeys));
    }

    return acc;
  }, []);
}

const catalogMetaByModel = collectCatalogMeta(catalogItems);

function buildCartItems(sceneItems) {
  const groupedByModel = new Map();
  const sourceItems = collectCartSourceItems(sceneItems);

  console.log("Source items", sceneItems);
  sourceItems.forEach((item) => {
    const modelKey = item.meta?.sku
      ? `${item.model || item.id}:${item.meta.sku}`
      : item.model || item.id;
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
      title: item.title || item.name || catalogMeta?.title || modelKey,
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
  const [sceneColor, setSceneColor] = useState('wood');
  const [quickAddRequest, setQuickAddRequest] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [showStartup, setShowStartup] = useState(true);
  const [presetRequest, setPresetRequest] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [rawSceneItems, setRawSceneItems] = useState([]);

  const handlePresetSelect = useCallback((preset) => {
    setShowStartup(false);
    setPresetRequest({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      preset,
    });
  }, []);

  // Carica configurazione da URL se presente ?config=<guid>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configGuid = params.get('config');
    if (!configGuid) return;

    supabase
      .from('Libreria')
      .select('items')
      .eq('guid', configGuid)
      .single()
      .then(({ data, error }) => {
        if (error || !data?.items) {
          console.error('Errore caricamento configurazione:', error);
          return;
        }
        setShowStartup(false);
        setPresetRequest({
          id: `config-${configGuid}`,
          preset: { steps: data.items },
        });
      });
  }, []);

  // URL del configuratore 3D — lasciare vuoto per mostrare il placeholder
  // const iframeSrc = 'http://localhost:5173?embed=true';
  // const iframeSrc = 'http://192.168.0.97:5173/?embed=true';

  const iframeSrc = 'https://configuratore-libreria-4b8v.vercel.app/?embed=true';



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

  const handleSceneState = useCallback((sceneState) => {
    const sceneItems = Array.isArray(sceneState)
      ? sceneState
      : Array.isArray(sceneState?.items)
        ? sceneState.items
        : [];
    const nextColor = !Array.isArray(sceneState) && typeof sceneState?.color === 'string'
      ? sceneState.color
      : null;

    setCartItems(buildCartItems(sceneItems));
    setRawSceneItems(sceneItems);

    if (nextColor) {
      setSceneColor(nextColor);
    }
  }, []);

  const handleSceneColor = useCallback((color) => {
    if (typeof color !== 'string') return;
    setSceneColor(color);
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

  const viewModeHiddenClass = isViewMode
    ? 'opacity-0 pointer-events-none transition-opacity duration-150'
    : 'transition-opacity duration-150';

  console.log('Selected item:', selectedItem);
  return (
    <div className="h-screen flex flex-col bg-white select-none">
      <div className={viewModeHiddenClass}>
        <Header onClose={handleClose} />
      </div>
      <div className="flex flex-1 overflow-hidden flex-col-reverse md:flex-row">
        <div className={viewModeHiddenClass}>
          <LeftSidebar items={catalogItems} onDragStart={handleDragStart} onQuickAdd={handleQuickAdd} catalogExpanded={catalogExpanded} setCatalogExpanded={setCatalogExpanded} />
        </div>

        <ConfiguratorView
          iframeSrc={iframeSrc}
          items={catalogItems}
          setSelectedItem={setSelectedItem}
          onSceneState={handleSceneState}
          onSceneColor={handleSceneColor}
          quickAddRequest={quickAddRequest}
          presetRequest={presetRequest}
          isViewMode={isViewMode}
          onViewModeChange={setIsViewMode}
        />

        <div className={viewModeHiddenClass}>
          <RightSidebar rawSceneItems={rawSceneItems} sceneColor={sceneColor} cartItems={cartItems} onAddToCart={(data) => {
            window.parent.postMessage({ type: 'add-to-cart', data }, '*');

          }} />
        </div>

        {selectedItem && (
          <div className={viewModeHiddenClass}>
            <ItemActions item={selectedItem} onClose={() => setSelectedItem(null)} />
          </div>
        )}

        {showStartup && (
          <div className={viewModeHiddenClass}>
            <StartupModal onSelect={handlePresetSelect} />
          </div>
        )}
      </div>
    </div>
  );
}
