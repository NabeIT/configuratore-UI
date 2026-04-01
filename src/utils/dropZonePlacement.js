const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj ?? {}, key);

export function resolveZoneType(item) {
  if (!item) return null;

  if (Array.isArray(item.variants) && item.variant !== undefined) {
    const variant = item.variants[item.variant];
    if (variant?.zoneType) return variant.zoneType;
  }

  return item.zoneType ?? null;
}

export function getCascadeZoneTypes(item) {
  if (!Array.isArray(item?.dropZones)) return [];

  return [...new Set(
    item.dropZones
      .filter((zone) => !!zone?.cascade)
      .flatMap((zone) => zone.acceptTypes ?? [])
  )];
}

export function getPlacementOptions(item, editedItem, availableDropZones) {
  const zoneType = resolveZoneType(item);
  if (!zoneType) {
    return {
      zoneType: null,
      hasLoadedZoneType: true,
      zones: [],
    };
  }

  const zonesByType =
    availableDropZones && typeof availableDropZones === "object"
      ? availableDropZones
      : {};

  const hasLoadedZoneType = hasOwn(zonesByType, zoneType);
  const rawZones = Array.isArray(zonesByType[zoneType]) ? zonesByType[zoneType] : [];

  const scopedZones = editedItem?.id
    ? rawZones.filter((entry) => entry?.zoneKey?.startsWith(`${editedItem.id}-dz-`))
    : rawZones;

  const orderedDirections = Array.isArray(editedItem?.dropZones)
    ? editedItem.dropZones
      .filter((zone) => zone?.acceptTypes?.includes(zoneType))
      .map((zone) => zone.direction)
    : [];

  const directionPriority = new Map(
    orderedDirections.map((direction, index) => [direction, index])
  );

  const zones = [...scopedZones].sort((a, b) => {
    const directionDiff =
      (directionPriority.get(a?.zone?.direction) ?? Number.MAX_SAFE_INTEGER) -
      (directionPriority.get(b?.zone?.direction) ?? Number.MAX_SAFE_INTEGER);

    if (directionDiff !== 0) return directionDiff;

    const yDiff = (b?.worldPosition?.[1] ?? -Infinity) - (a?.worldPosition?.[1] ?? -Infinity);
    if (yDiff !== 0) return yDiff;

    return (b?.worldPosition?.[0] ?? -Infinity) - (a?.worldPosition?.[0] ?? -Infinity);
  });

  return {
    zoneType,
    hasLoadedZoneType,
    zones,
  };
}

export function getPreferredTargetZoneKey(item, editedItem, availableDropZones) {
  return getPlacementOptions(item, editedItem, availableDropZones).zones[0]?.zoneKey ?? null;
}

export function canQuickAddItem(item, editedItem, availableDropZones) {
  const { zoneType, hasLoadedZoneType, zones } = getPlacementOptions(
    item,
    editedItem,
    availableDropZones
  );

  if (!zoneType) return true;
  if (editedItem && !hasLoadedZoneType) return true;

  return zones.length > 0;
}
