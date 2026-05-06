const ORDER_SKU_CATALOG = {
  SCAT2BAR36: {
    titles: {
      wood: "2x Fianchi h 36cm",
      white: "2x Fianchi h 36cm bio paint",
    },
    prices: {
      wood: 122,
      white: 145, // TODO: Giulione
    },
  },
  SCAT2BAR95: {
    titles: {
      wood: "2x Fianchi h 95cm (per ripiani 80cm)",
      white: "2x Fianchi h 95cm (per ripiani 80cm) bio paint",
    },
    prices: {
      wood: 159,
      white: 213,
    },
  },
  SCAT2BAR95STAFFA60: {
    titles: {
      wood: "2x Fianchi h 95cm (per ripiani 60cm)",
      white: "2x Fianchi h 95cm (per ripiani 60cm) bio paint",
    },
    prices: {
      wood: 159,
      white: 213,
    },
  },
  SCAT2RIP60: {
    titles: {
      wood: "2x Ripiani 60cm",
      white: "2x Ripiani 60cm bio paint",
    },
    prices: {
      wood: 90,
      white: 169,
    },
  },
  SCAT2RIP80: {
    titles: {
      wood: "2x Ripiani 80cm",
      white: "2x Ripiani 80cm bio paint",
    },
    prices: {
      wood: 90,
      white: 169,
    },
  },
  SCAT2RIP80AP: {
    titles: {
      wood: "Ripiano appendiabiti 80cm + mensola 80cm",
      white: "Ripiano appendiabiti 80cm + mensola 80cm bio paint",
    },
    prices: {
      wood: 113,
      white: 155, // TODO: Giulione
    },
  },
  SCAT3BAR95: {
    titles: {
      wood: "3x Fianchi h 95cm (per ripiani 80cm)",
      white: "3x Fianchi h 95cm (per ripiani 80cm) bio paint",
    },
    prices: {
      wood: 227,
      white: 393,
    },
  },
  SCAT3BAR95STAFFA60: {
    titles: {
      wood: "3x Fianchi h 95cm (per ripiani 60cm)",
      white: "3x Fianchi h 95cm (per ripiani 60cm) bio paint",
    },
    prices: {
      wood: 227,
      white: 393,
    },
  },
  SCAT3RIP60: {
    titles: {
      wood: "3x Ripiani 60cm",
      white: "3x Ripiani 60cm bio paint",
    },
    prices: {
      wood: 133,
      white: 222,
    },
  },
  SCAT3RIP80: {
    titles: {
      wood: "3x Ripiani 80cm",
      white: "3x Ripiani 80cm bio paint",
    },
    prices: {
      wood: 133,
      white: 222,
    },
  },
  SCAT3RIPS80: {
    titles: {
      wood: "3x Ripiani Montessori 80cm",
      white: "3x Ripiani Montessori 80cm bio paint",
    },
    prices: {
      wood: 182,
      white: 303,
    },
  },
  SCAT3RIPS60: {
    titles: {
      wood: "3x Ripiani Montessori 60cm",
      white: "3x Ripiani Montessori 60cm bio paint",
    },
    prices: {
      wood: 182,
      white: 303,
    },
  },
  SCATBARR78T: {
    titles: {
      wood: "2x Fianchi h 78cm a terra (per ripiani 80cm)",
      white: "2x Fianchi h 78cm a terra (per ripiani 80cm) bio paint",
    },
    prices: {
      wood: 117,
      white: 195,
    },
  },
  SCATBARR78TSTAFFA60: {
    titles: {
      wood: "2x Fianchi h 78cm a terra (per ripiani 60cm)",
      white: "2x Fianchi h 78cm a terra (per ripiani 60cm) bio paint",
    },
    prices: {
      wood: 117,
      white: 195,
    },
  },
  SCATSCR80: {
    titles: {
      wood: "Scrivania",
      white: "Scrivania bio paint",
    },
    prices: {
      wood: 189,
      white: 269,
    },
  },
  EL14R80: {
    titles: {
      wood: "Mensola mini 80cm",
      white: "Mensola mini 80cm bio paint",
    },
    prices: {
      wood: 29,
      white: 29,
    },
  },
};

// TODO: Giulione
// Aggiungere le variantid
const ORDER_SKU_VARIANTS_BY_COLOR = {
  SCAT2BAR95: {
    wood: {
      sku: "SCAT2BAR95",
      handle: "scat2bar95",
      variantId: "57008244293976",
    },
    white: {
      sku: "SCAT2BAR95W",
      handle: "scat2bar95w",
      variantId: "57008244457816",
    },
  },
  SCAT2BAR95STAFFA60: {
    wood: {
      sku: "SCAT2BAR95STAFFA60",
      handle: "scat2bar95staffa60",
      variantId: "57008244392280",
    },
    white: {
      sku: "SCAT2BAR95STAFFA60W",
      handle: "scat2bar95staffa60w",
      variantId: "57008244621656",
    },
  },
  SCAT2RIP60: {
    wood: {
      sku: "SCAT2RIP60",
      handle: "scat2rip60",
      variantId: "57008244785496",
    },
    // In CSV la variante white usa ancora SKU SCAT2RIP60 ma handle diverso (scat2rip60-2)
    white: {
      sku: "SCAT2RIP60",
      handle: "scat2rip60-2",
      variantId: "57008245309784",
    },
  },
  SCAT2RIP80: {
    wood: {
      sku: "SCAT2RIP80",
      handle: "scat2rip80",
      variantId: "57008244719960",
    },
    white: {
      sku: "SCAT2RIP80W",
      handle: "scat2rip80w",
      variantId: "57008245211480",
    },
  },
  SCAT3BAR95: {
    wood: {
      sku: "SCAT3BAR95",
      handle: "scat3bar95",
      variantId: "57008244326744",
    },
    white: {
      sku: "SCAT3BAR95W",
      handle: "scat3bar95w",
      variantId: "57008244588888",
    },
  },
  SCAT3BAR95STAFFA60: {
    wood: {
      sku: "SCAT3BAR95STAFFA60",
      handle: "scat3bar95staffa60",
      variantId: "57008244425048",
    },
    white: {
      sku: "SCAT3BAR95STAFFA60W",
      handle: "scat3bar95staffa60w",
      variantId: "57008244654424",
    },
  },
  SCAT3RIP60: {
    wood: {
      sku: "SCAT3RIP60",
      handle: "scat3rip60",
      variantId: "57008244949336",
    },
    white: {
      sku: "SCAT3RIP60W",
      handle: "scat3rip60w",
      variantId: "57008245473624",
    },
  },
  SCAT3RIP80: {
    wood: {
      sku: "SCAT3RIP80",
      handle: "scat3rip80",
      variantId: "57008244851032",
    },
    white: {
      sku: "SCAT3RIP80W",
      handle: "scat3rip80w",
      variantId: "57008245375320",
    },
  },
  SCAT3RIPS60: {
    wood: {
      sku: "SCAT3RIPS60",
      handle: "scat3rips60",
      variantId: "57008245637464",
    },
    white: {
      sku: "SCAT3RIPS60W",
      handle: "scat3rips60w",
      variantId: "57008245703000",
    },
  },
  SCAT3RIPS80: {
    wood: {
      sku: "SCAT3RIPS80",
      handle: "scat3rips80",
      variantId: "57008245571928",
    },
    white: {
      sku: "SCAT3RIPS80W",
      handle: "scat3rips80w",
      variantId: "57008245604696",
    },
  },
  SCATBARR78T: {
    wood: {
      sku: "SCATBARR78T",
      handle: "scatbarr78t",
      variantId: "57008245735768",
    },
    white: {
      sku: "SCATBARR78TW",
      handle: "scatbarr78tw",
      variantId: "57008245768536",
    },
  },
  SCATBARR78TSTAFFA60: {
    wood: {
      sku: "SCATBARR78TSTAFFA60",
      handle: "scatbarr78tstaffa60",
      variantId: "57008245834072",
    },
    white: {
      sku: "SCATBARR78TSTAFFA60W",
      handle: "scatbarr78tstaffa60w",
      variantId: "57008245899608",
    },
  },
  SCATSCR80: {
    wood: {
      sku: "SCATSCR80",
      handle: "scatscr80",
      variantId: "57008246063448",
    },
    white: {
      sku: "SCATSCR80W",
      handle: "scatscr80w",
      variantId: "57008246096216",
    },
  },
};

const GROUPED_INPUT_SKUS = new Set([
  "BARR36",
  "BARR78",
  "BARR78-80",
  "BARR95",
  "ELRL60",
  "ELRL80",
  "ELRAPP80",
  "ELSCR80",
  "SCAT3RIPS60",
  "SCAT3RIPS80",
]);

const PASSTHROUGH_INPUT_SKUS = new Set(["EL14R80"]);

const ORDER_HANDLED_INPUT_SKUS = new Set([
  ...GROUPED_INPUT_SKUS,
  ...PASSTHROUGH_INPUT_SKUS,
]);

const GROUPED_OUTPUT_TO_PRICE_SOURCE = {
  SCAT2BAR36: { sourceSku: "BARR36", units: 2 },
  SCAT2BAR95: { sourceSku: "BARR95", units: 2 },
  SCAT2BAR95STAFFA60: { sourceSku: "BARR95", units: 2 },
  SCAT2RIP60: { sourceSku: "ELRL60", units: 2 },
  SCAT2RIP80: { sourceSku: "ELRL80", units: 2 },
  SCAT2RIP80AP: { sourceSku: "ELRAPP80", units: 1 },
  SCAT3BAR95: { sourceSku: "BARR95", units: 3 },
  SCAT3BAR95STAFFA60: { sourceSku: "BARR95", units: 3 },
  SCAT3RIP60: { sourceSku: "ELRL60", units: 3 },
  SCAT3RIP80: { sourceSku: "ELRL80", units: 3 },
  SCAT3RIPS60: { sourceSku: "SCAT3RIPS60", units: 1 },
  SCAT3RIPS80: { sourceSku: "SCAT3RIPS80", units: 1 },
  SCATBARR78T: { sourceSku: "BARR78-80", units: 2 },
  SCATBARR78TSTAFFA60: { sourceSku: "BARR78", units: 2 },
  SCATSCR80: { sourceSku: "ELSCR80", units: 1 },
};

const getToBuy = (item, ownedQuantities) => {
  const owned = ownedQuantities[item.id] || 0;
  return Math.max(item.quantity - owned, 0);
};

const getToBuyBySku = (cartItems, sku, ownedQuantities) =>
  cartItems.reduce((sum, item) => {
    if (item.meta?.sku !== sku) return sum;
    return sum + getToBuy(item, ownedQuantities);
  }, 0);

const normalizeColor = (color) => (color === "white" ? "white" : "wood");
const normalizeSku = (sku) =>
  typeof sku === "string" && sku.endsWith("W") ? sku.slice(0, -1) : sku;
const isSkuInCart = (cartItems, sku) =>
  cartItems.some((item) => item.meta?.sku === sku);

export function getOrderSkuTitle(sku, color = "wood") {
  const normalizedSku = normalizeSku(sku);
  const normalizedColor = normalizeColor(color);
  const catalogEntry = ORDER_SKU_CATALOG[normalizedSku];

  if (!catalogEntry) return null;
  return (
    catalogEntry.titles[normalizedColor] ?? catalogEntry.titles.wood ?? null
  );
}

export function getOrderSkuPrice(sku, color = "wood") {
  const normalizedSku = normalizeSku(sku);
  const normalizedColor = normalizeColor(color);
  const catalogEntry = ORDER_SKU_CATALOG[normalizedSku];

  if (!catalogEntry) return null;
  return (
    catalogEntry.prices[normalizedColor] ?? catalogEntry.prices.wood ?? null
  );
}

export function getOrderVariantData(sku, color = "wood") {
  const normalizedSku = normalizeSku(sku);
  const normalizedColor = normalizeColor(color);
  const entry = ORDER_SKU_VARIANTS_BY_COLOR[normalizedSku];

  if (!entry) return null;
  return entry[normalizedColor] ?? entry.wood ?? null;
}

const pushPackage = (packages, sku, quantity, fallbackTitle, color) => {
  if (quantity <= 0) return;

  packages.push({
    title: getOrderSkuTitle(sku, color) ?? fallbackTitle,
    sku,
    quantity,
    price: getOrderSkuPrice(sku, color),
  });
};

const getTwoFirstPackageQuantities = (toBuy) => {
  const quantity = Math.max(toBuy, 0);
  let sku2Quantity = Math.floor(quantity / 2);
  const sku3Quantity = quantity % 2 > 0 ? 1 : 0;

  if (sku3Quantity > 0) {
    sku2Quantity -= 1;
  }

  return {
    sku2Quantity: Math.max(sku2Quantity, 0),
    sku3Quantity,
  };
};

const getThreeFirstPackageQuantities = (toBuy) => {
  const quantity = Math.max(toBuy, 0);

  return {
    sku2Quantity: quantity % 3 > 0 ? 1 : 0,
    sku3Quantity: Math.floor(quantity / 3),
  };
};

const pushTwoThreePackages = (
  packages,
  {
    toBuy,
    sku2,
    sku3,
    fallbackTitle2,
    fallbackTitle3,
    color,
    strategy = "twoFirst",
  },
) => {
  const quantities =
    strategy === "threeFirst"
      ? getThreeFirstPackageQuantities(toBuy)
      : getTwoFirstPackageQuantities(toBuy);
  const pushOrder =
    strategy === "threeFirst"
      ? [
          [sku2, quantities.sku2Quantity, fallbackTitle2],
          [sku3, quantities.sku3Quantity, fallbackTitle3],
        ]
      : [
          [sku3, quantities.sku3Quantity, fallbackTitle3],
          [sku2, quantities.sku2Quantity, fallbackTitle2],
        ];

  pushOrder.forEach(([sku, quantity, fallbackTitle]) => {
    pushPackage(packages, sku, quantity, fallbackTitle, color);
  });
};

export function calculateOrderItems(
  cartItems = [],
  ownedQuantities = {},
  color = "wood",
) {
  const visibleItems = cartItems.filter((item) => item.meta?.inCart !== false);
  const cartPackages = [];
  const has60Context =
    isSkuInCart(visibleItems, "ELRL60") ||
    isSkuInCart(visibleItems, "SCAT3RIPS60") ||
    isSkuInCart(visibleItems, "BARR78");
  const has80Context =
    isSkuInCart(visibleItems, "ELRL80") ||
    isSkuInCart(visibleItems, "SCAT3RIPS80") ||
    isSkuInCart(visibleItems, "BARR78-80") ||
    isSkuInCart(visibleItems, "ELSCR80") ||
    isSkuInCart(visibleItems, "ELRAPP80") ||
    isSkuInCart(visibleItems, "EL14R80");

  const ELRL60ToBuy = getToBuyBySku(visibleItems, "ELRL60", ownedQuantities);
  if (ELRL60ToBuy > 0) {
    pushTwoThreePackages(cartPackages, {
      toBuy: ELRL60ToBuy,
      sku2: "SCAT2RIP60",
      sku3: "SCAT3RIP60",
      fallbackTitle2:
        "Ripiani 60 cm libreria (2pz) compreso imballo e ferramenta",
      fallbackTitle3:
        "Ripiani 60 cm libreria (3pz) compreso imballo e ferramenta",
      color,
    });
  }

  const ELRAPP80ToBuy = getToBuyBySku(
    visibleItems,
    "ELRAPP80",
    ownedQuantities,
  );
  pushPackage(
    cartPackages,
    "SCAT2RIP80AP",
    ELRAPP80ToBuy,
    "Ripiano appendiabiti 80 cm + mensola 80 cm, compreso imballo e ferramenta",
    color,
  );

  const ELRL80ToBuy = getToBuyBySku(visibleItems, "ELRL80", ownedQuantities);
  const ELRL80ToPack = Math.max(ELRL80ToBuy - ELRAPP80ToBuy, 0);
  if (ELRL80ToPack > 0) {
    pushTwoThreePackages(cartPackages, {
      toBuy: ELRL80ToPack,
      sku2: "SCAT2RIP80",
      sku3: "SCAT3RIP80",
      fallbackTitle2:
        "Ripiani 80 cm libreria (2pz) compreso imballo e ferramenta",
      fallbackTitle3:
        "Ripiani 80 cm libreria (3pz) compreso imballo e ferramenta",
      color,
      strategy: ELRAPP80ToBuy > 0 ? "threeFirst" : "twoFirst",
    });
  }

  const SCATSCR80ToBuy = getToBuyBySku(
    visibleItems,
    "ELSCR80",
    ownedQuantities,
  );
  if (SCATSCR80ToBuy > 0) {
    pushPackage(
      cartPackages,
      "SCATSCR80",
      SCATSCR80ToBuy,
      "Scaffale 80 cm libreria (1pz) compreso imballo e ferramenta",
      color,
    );
  }

  const SCAT3RIPS60ToBuy = getToBuyBySku(
    visibleItems,
    "SCAT3RIPS60",
    ownedQuantities,
  );
  if (SCAT3RIPS60ToBuy > 0) {
    pushPackage(
      cartPackages,
      "SCAT3RIPS60",
      SCAT3RIPS60ToBuy,
      "Mensole montessoriane 60 cm libreria (3pz) compreso imballo e ferramenta",
      color,
    );
  }

  const SCAT3RIPS80ToBuy = getToBuyBySku(
    visibleItems,
    "SCAT3RIPS80",
    ownedQuantities,
  );
  if (SCAT3RIPS80ToBuy > 0) {
    pushPackage(
      cartPackages,
      "SCAT3RIPS80",
      SCAT3RIPS80ToBuy,
      "Mensole montessoriane 80 cm libreria (3pz) compreso imballo e ferramenta",
      color,
    );
  }

  const BARR36ToBuy = getToBuyBySku(visibleItems, "BARR36", ownedQuantities);
  if (BARR36ToBuy > 0) {
    const numPackages = Math.ceil(BARR36ToBuy / 2);

    pushPackage(
      cartPackages,
      "SCAT2BAR36",
      numPackages,
      "Fianchi h 36 cm libreria (2pz) compreso imballo e ferramenta",
      color,
    );
  }

  const BARR78ToBuy = getToBuyBySku(visibleItems, "BARR78", ownedQuantities);
  if (BARR78ToBuy > 0) {
    const numPackages = Math.ceil(BARR78ToBuy / 2);

    pushPackage(
      cartPackages,
      "SCATBARR78TSTAFFA60",
      numPackages,
      "Barra 78 cm libreria (2pz) compreso imballo e ferramenta, con staffa per ripiano 60 cm",
      color,
    );
  }

  const BARR78_80ToBuy = getToBuyBySku(
    visibleItems,
    "BARR78-80",
    ownedQuantities,
  );
  if (BARR78_80ToBuy > 0) {
    const numPackages = Math.ceil(BARR78_80ToBuy / 2);

    pushPackage(
      cartPackages,
      "SCATBARR78T",
      numPackages,
      "Barra 78 cm libreria (2pz) compreso imballo e ferramenta, con staffa per ripiano 80 cm",
      color,
    );
  }

  const BARR95ToBuy = getToBuyBySku(visibleItems, "BARR95", ownedQuantities);
  if (BARR95ToBuy > 0) {
    const bar95SkuPair =
      has60Context && !has80Context
        ? { sku2: "SCAT2BAR95STAFFA60", sku3: "SCAT3BAR95STAFFA60" }
        : { sku2: "SCAT2BAR95", sku3: "SCAT3BAR95" };

    pushTwoThreePackages(cartPackages, {
      toBuy: BARR95ToBuy,
      sku2: bar95SkuPair.sku2,
      sku3: bar95SkuPair.sku3,
      fallbackTitle2: "2x Fianchi h 95cm (per ripiani 80cm)",
      fallbackTitle3: "3x Fianchi h 95cm (per ripiani 80cm)",
      color,
    });
  }

  PASSTHROUGH_INPUT_SKUS.forEach((sku) => {
    const toBuy = getToBuyBySku(visibleItems, sku, ownedQuantities);
    pushPackage(cartPackages, sku, toBuy, sku, color);
  });

  return cartPackages;
}

export function calculateRealtimeCartTotal(
  cartItems = [],
  ownedQuantities = {},
  color = "wood",
) {
  const visibleItems = cartItems.filter((item) => item.meta?.inCart !== false);
  const orderItems = calculateOrderItems(visibleItems, ownedQuantities, color);
  const priceBySku = new Map(
    visibleItems.map((item) => [item.meta?.sku, item.meta?.price || 0]),
  );

  const groupedTotal = orderItems.reduce((sum, orderItem) => {
    if (typeof orderItem.price === "number") {
      return sum + orderItem.quantity * orderItem.price;
    }

    const priceSource = GROUPED_OUTPUT_TO_PRICE_SOURCE[orderItem.sku];
    if (!priceSource) {
      const directPrice = priceBySku.get(orderItem.sku) || 0;
      return sum + orderItem.quantity * directPrice;
    }

    const unitPrice = priceBySku.get(priceSource.sourceSku) || 0;
    return sum + orderItem.quantity * unitPrice * priceSource.units;
  }, 0);

  const nonGroupedTotal = visibleItems.reduce((sum, item) => {
    if (ORDER_HANDLED_INPUT_SKUS.has(item.meta?.sku)) return sum;
    const toBuy = getToBuy(item, ownedQuantities);
    return sum + toBuy * (item.meta?.price || 0);
  }, 0);

  return groupedTotal + nonGroupedTotal;
}
