const ORDER_SKU_CATALOG = {
    SCAT2BAR95: {
        titles: {
            wood: '2x Fianchi h 95cm (per ripiani 80cm)',
            white: '2x Fianchi h 95cm (per ripiani 80cm) bio paint',
        },
        prices: {
            wood: 159,
            white: 213,
        },
    },
    SCAT2BAR95STAFFA60: {
        titles: {
            wood: '2x Fianchi h 95cm (per ripiani 60cm)',
            white: '2x Fianchi h 95cm (per ripiani 60cm) bio paint',
        },
        prices: {
            wood: 159,
            white: 213,
        },
    },
    SCAT2RIP60: {
        titles: {
            wood: '2x Ripiani 60cm',
            white: '2x Ripiani 60cm bio paint',
        },
        prices: {
            wood: 90,
            white: 169,
        },
    },
    SCAT2RIP80: {
        titles: {
            wood: '2x Ripiani 80cm',
            white: '2x Ripiani 80cm bio paint',
        },
        prices: {
            wood: 90,
            white: 169,
        },
    },
    SCAT3BAR95: {
        titles: {
            wood: '3x Fianchi h 95cm (per ripiani 80cm)',
            white: '3x Fianchi h 95cm (per ripiani 80cm) bio paint',
        },
        prices: {
            wood: 227,
            white: 393,
        },
    },
    SCAT3BAR95STAFFA60: {
        titles: {
            wood: '3x Fianchi h 95cm (per ripiani 60cm)',
            white: '3x Fianchi h 95cm (per ripiani 60cm) bio paint',
        },
        prices: {
            wood: 227,
            white: 393,
        },
    },
    SCAT3RIP60: {
        titles: {
            wood: '3x Ripiani 60cm',
            white: '3x Ripiani 60cm bio paint',
        },
        prices: {
            wood: 133,
            white: 222,
        },
    },
    SCAT3RIP80: {
        titles: {
            wood: '3x Ripiani 80cm',
            white: '3x Ripiani 80cm bio paint',
        },
        prices: {
            wood: 133,
            white: 222,
        },
    },
    SCAT3RIPS80: {
        titles: {
            wood: '3x Ripiani Montessori 80cm',
            white: '3x Ripiani Montessori 80cm bio paint',
        },
        prices: {
            wood: 182,
            white: 303,
        },
    },
    SCAT3RIPS60: {
        titles: {
            wood: '3x Ripiani Montessori 60cm',
            white: '3x Ripiani Montessori 60cm bio paint',
        },
        prices: {
            wood: 182,
            white: 303,
        },
    },
    SCATBARR78T: {
        titles: {
            wood: '2x Fianchi h 78cm a terra (per ripiani 80cm)',
            white: '2x Fianchi h 78cm a terra (per ripiani 80cm) bio paint',
        },
        prices: {
            wood: 117,
            white: 195,
        },
    },
    SCATBARR78TSTAFFA60: {
        titles: {
            wood: '2x Fianchi h 78cm a terra (per ripiani 60cm)',
            white: '2x Fianchi h 78cm a terra (per ripiani 60cm) bio paint',
        },
        prices: {
            wood: 117,
            white: 195,
        },
    },
    SCATSCR80: {
        titles: {
            wood: 'Scrivania',
            white: 'Scrivania bio paint',
        },
        prices: {
            wood: 189,
            white: 269,
        },
    },
};

const ORDER_SKU_VARIANTS_BY_COLOR = {
    SCAT2BAR95: {
        wood: { sku: 'SCAT2BAR95', handle: 'scat2bar95', variantId: '57008244293976' },
        white: { sku: 'SCAT2BAR95W', handle: 'scat2bar95w', variantId: '57008244457816' },
    },
    SCAT2BAR95STAFFA60: {
        wood: { sku: 'SCAT2BAR95STAFFA60', handle: 'scat2bar95staffa60', variantId: '57008244392280' },
        white: { sku: 'SCAT2BAR95STAFFA60W', handle: 'scat2bar95staffa60w', variantId: '57008244621656' },
    },
    SCAT2RIP60: {
        wood: { sku: 'SCAT2RIP60', handle: 'scat2rip60', variantId: '57008244785496' },
        // In CSV la variante white usa ancora SKU SCAT2RIP60 ma handle diverso (scat2rip60-2)
        white: { sku: 'SCAT2RIP60', handle: 'scat2rip60-2', variantId: '57008245309784' },
    },
    SCAT2RIP80: {
        wood: { sku: 'SCAT2RIP80', handle: 'scat2rip80', variantId: '57008244719960' },
        white: { sku: 'SCAT2RIP80W', handle: 'scat2rip80w', variantId: '57008245211480' },
    },
    SCAT3BAR95: {
        wood: { sku: 'SCAT3BAR95', handle: 'scat3bar95', variantId: '57008244326744' },
        white: { sku: 'SCAT3BAR95W', handle: 'scat3bar95w', variantId: '57008244588888' },
    },
    SCAT3BAR95STAFFA60: {
        wood: { sku: 'SCAT3BAR95STAFFA60', handle: 'scat3bar95staffa60', variantId: '57008244425048' },
        white: { sku: 'SCAT3BAR95STAFFA60W', handle: 'scat3bar95staffa60w', variantId: '57008244654424' },
    },
    SCAT3RIP60: {
        wood: { sku: 'SCAT3RIP60', handle: 'scat3rip60', variantId: '57008244949336' },
        white: { sku: 'SCAT3RIP60W', handle: 'scat3rip60w', variantId: '57008245473624' },
    },
    SCAT3RIP80: {
        wood: { sku: 'SCAT3RIP80', handle: 'scat3rip80', variantId: '57008244851032' },
        white: { sku: 'SCAT3RIP80W', handle: 'scat3rip80w', variantId: '57008245375320' },
    },
    SCAT3RIPS60: {
        wood: { sku: 'SCAT3RIPS60', handle: 'scat3rips60', variantId: '57008245637464' },
        white: { sku: 'SCAT3RIPS60W', handle: 'scat3rips60w', variantId: '57008245703000' },
    },
    SCAT3RIPS80: {
        wood: { sku: 'SCAT3RIPS80', handle: 'scat3rips80', variantId: '57008245571928' },
        white: { sku: 'SCAT3RIPS80W', handle: 'scat3rips80w', variantId: '57008245604696' },
    },
    SCATBARR78T: {
        wood: { sku: 'SCATBARR78T', handle: 'scatbarr78t', variantId: '57008245735768' },
        white: { sku: 'SCATBARR78TW', handle: 'scatbarr78tw', variantId: '57008245768536' },
    },
    SCATBARR78TSTAFFA60: {
        wood: { sku: 'SCATBARR78TSTAFFA60', handle: 'scatbarr78tstaffa60', variantId: '57008245834072' },
        white: { sku: 'SCATBARR78TSTAFFA60W', handle: 'scatbarr78tstaffa60w', variantId: '57008245899608' },
    },
    SCATSCR80: {
        wood: { sku: 'SCATSCR80', handle: 'scatscr80', variantId: '57008246063448' },
        white: { sku: 'SCATSCR80W', handle: 'scatscr80w', variantId: '57008246096216' },
    },
};

const GROUPED_INPUT_SKUS = new Set([
    'BARR78',
    'BARR78-80',
    'BARR95',
    'ELRL60',
    'ELRL80',
    'ELSCR80',
    'SCAT3RIPS60',
    'SCAT3RIPS80',
]);

const GROUPED_OUTPUT_TO_PRICE_SOURCE = {
    SCAT2BAR95: { sourceSku: 'BARR95', units: 2 },
    SCAT2BAR95STAFFA60: { sourceSku: 'BARR95', units: 2 },
    SCAT2RIP60: { sourceSku: 'ELRL60', units: 2 },
    SCAT2RIP80: { sourceSku: 'ELRL80', units: 2 },
    SCAT3BAR95: { sourceSku: 'BARR95', units: 3 },
    SCAT3BAR95STAFFA60: { sourceSku: 'BARR95', units: 3 },
    SCAT3RIP60: { sourceSku: 'ELRL60', units: 3 },
    SCAT3RIP80: { sourceSku: 'ELRL80', units: 3 },
    SCAT3RIPS60: { sourceSku: 'SCAT3RIPS60', units: 1 },
    SCAT3RIPS80: { sourceSku: 'SCAT3RIPS80', units: 1 },
    SCATBARR78T: { sourceSku: 'BARR78-80', units: 2 },
    SCATBARR78TSTAFFA60: { sourceSku: 'BARR78', units: 2 },
    SCATSCR80: { sourceSku: 'ELSCR80', units: 1 },
};

const findBySku = (cartItems, sku) => cartItems.find((item) => item.meta?.sku === sku);

const getToBuy = (item, ownedQuantities) => {
    const owned = ownedQuantities[item.id] || 0;
    return Math.max(item.quantity - owned, 0);
};

const normalizeColor = (color) => (color === 'white' ? 'white' : 'wood');
const normalizeSku = (sku) => (typeof sku === 'string' && sku.endsWith('W') ? sku.slice(0, -1) : sku);
const isSkuInCart = (cartItems, sku) => cartItems.some((item) => item.meta?.sku === sku);

export function getOrderSkuTitle(sku, color = 'wood') {
    const normalizedSku = normalizeSku(sku);
    const normalizedColor = normalizeColor(color);
    const catalogEntry = ORDER_SKU_CATALOG[normalizedSku];

    if (!catalogEntry) return null;
    return catalogEntry.titles[normalizedColor] ?? catalogEntry.titles.wood ?? null;
}

export function getOrderSkuPrice(sku, color = 'wood') {
    const normalizedSku = normalizeSku(sku);
    const normalizedColor = normalizeColor(color);
    const catalogEntry = ORDER_SKU_CATALOG[normalizedSku];

    if (!catalogEntry) return null;
    return catalogEntry.prices[normalizedColor] ?? catalogEntry.prices.wood ?? null;
}

export function getOrderVariantData(sku, color = 'wood') {
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

export function calculateOrderItems(cartItems = [], ownedQuantities = {}, color = 'wood') {
    const visibleItems = cartItems.filter((item) => item.meta?.inCart !== false);
    const cartPackages = [];
    const has60Context = isSkuInCart(visibleItems, 'ELRL60')
        || isSkuInCart(visibleItems, 'SCAT3RIPS60')
        || isSkuInCart(visibleItems, 'BARR78');
    const has80Context = isSkuInCart(visibleItems, 'ELRL80')
        || isSkuInCart(visibleItems, 'SCAT3RIPS80')
        || isSkuInCart(visibleItems, 'BARR78-80')
        || isSkuInCart(visibleItems, 'ELSCR80');

    const ELRL60 = findBySku(visibleItems, 'ELRL60');
    if (ELRL60) {
        const toBuy = getToBuy(ELRL60, ownedQuantities);
        let numPackages = Math.floor(toBuy / 2);
        const remaining = toBuy % 2;

        if (remaining > 0) {
            numPackages -= 1;
            pushPackage(
                cartPackages,
                'SCAT3RIP60',
                1,
                'Ripiani 60 cm libreria (3pz) compreso imballo e ferramenta',
                color
            );
        }

        pushPackage(
            cartPackages,
            'SCAT2RIP60',
            numPackages,
            'Ripiani 60 cm libreria (2pz) compreso imballo e ferramenta',
            color
        );
    }

    const ELRL80 = findBySku(visibleItems, 'ELRL80');
    if (ELRL80) {
        const toBuy = getToBuy(ELRL80, ownedQuantities);
        let numPackages = Math.floor(toBuy / 2);
        const remaining = toBuy % 2;

        if (remaining > 0) {
            numPackages -= 1;
            pushPackage(
                cartPackages,
                'SCAT3RIP80',
                1,
                'Ripiani 80 cm libreria (3pz) compreso imballo e ferramenta',
                color
            );
        }

        pushPackage(
            cartPackages,
            'SCAT2RIP80',
            numPackages,
            'Ripiani 80 cm libreria (2pz) compreso imballo e ferramenta',
            color
        );
    }

    const SCATSCR80 = findBySku(visibleItems, 'ELSCR80');
    if (SCATSCR80) {
        const toBuy = getToBuy(SCATSCR80, ownedQuantities);
        pushPackage(
            cartPackages,
            'SCATSCR80',
            toBuy,
            'Scaffale 80 cm libreria (1pz) compreso imballo e ferramenta',
            color
        );
    }

    const SCAT3RIPS60 = findBySku(visibleItems, 'SCAT3RIPS60');
    if (SCAT3RIPS60) {
        const toBuy = getToBuy(SCAT3RIPS60, ownedQuantities);
        pushPackage(
            cartPackages,
            'SCAT3RIPS60',
            toBuy,
            'Mensole montessoriane 60 cm libreria (3pz) compreso imballo e ferramenta',
            color
        );
    }

    const SCAT3RIPS80 = findBySku(visibleItems, 'SCAT3RIPS80');
    if (SCAT3RIPS80) {
        const toBuy = getToBuy(SCAT3RIPS80, ownedQuantities);
        pushPackage(
            cartPackages,
            'SCAT3RIPS80',
            toBuy,
            'Mensole montessoriane 80 cm libreria (3pz) compreso imballo e ferramenta',
            color
        );
    }

    const BARR78 = findBySku(visibleItems, 'BARR78');
    if (BARR78) {
        const toBuy = getToBuy(BARR78, ownedQuantities);
        const numPackages = Math.ceil(toBuy / 2);

        pushPackage(
            cartPackages,
            'SCATBARR78TSTAFFA60',
            numPackages,
            'Barra 78 cm libreria (2pz) compreso imballo e ferramenta, con staffa per ripiano 60 cm',
            color
        );
    }

    const BARR78_80 = findBySku(visibleItems, 'BARR78-80');
    if (BARR78_80) {
        const toBuy = getToBuy(BARR78_80, ownedQuantities);
        const numPackages = Math.ceil(toBuy / 2);

        pushPackage(
            cartPackages,
            'SCATBARR78T',
            numPackages,
            'Barra 78 cm libreria (2pz) compreso imballo e ferramenta, con staffa per ripiano 80 cm',
            color
        );
    }

    const BARR95 = findBySku(visibleItems, 'BARR95');
    if (BARR95) {
        const bar95SkuPair = has60Context && !has80Context
            ? { sku2: 'SCAT2BAR95STAFFA60', sku3: 'SCAT3BAR95STAFFA60' }
            : { sku2: 'SCAT2BAR95', sku3: 'SCAT3BAR95' };
        const toBuy = getToBuy(BARR95, ownedQuantities);
        let numPackages = Math.floor(toBuy / 2);
        const remaining = toBuy % 2;

        if (remaining > 0) {
            numPackages -= 1;
            pushPackage(
                cartPackages,
                bar95SkuPair.sku3,
                1,
                '3x Fianchi h 95cm (per ripiani 80cm)',
                color
            );
        }

        pushPackage(
            cartPackages,
            bar95SkuPair.sku2,
            numPackages,
            '2x Fianchi h 95cm (per ripiani 80cm)',
            color
        );
    }

    return cartPackages;
}

export function calculateRealtimeCartTotal(cartItems = [], ownedQuantities = {}, color = 'wood') {
    const visibleItems = cartItems.filter((item) => item.meta?.inCart !== false);
    const orderItems = calculateOrderItems(visibleItems, ownedQuantities, color);
    const priceBySku = new Map(
        visibleItems.map((item) => [item.meta?.sku, item.meta?.price || 0])
    );

    const groupedTotal = orderItems.reduce((sum, orderItem) => {
        if (typeof orderItem.price === 'number') {
            return sum + (orderItem.quantity * orderItem.price);
        }

        const priceSource = GROUPED_OUTPUT_TO_PRICE_SOURCE[orderItem.sku];
        if (!priceSource) {
            const directPrice = priceBySku.get(orderItem.sku) || 0;
            return sum + (orderItem.quantity * directPrice);
        }

        const unitPrice = priceBySku.get(priceSource.sourceSku) || 0;
        return sum + (orderItem.quantity * unitPrice * priceSource.units);
    }, 0);

    const nonGroupedTotal = visibleItems.reduce((sum, item) => {
        if (GROUPED_INPUT_SKUS.has(item.meta?.sku)) return sum;
        const toBuy = getToBuy(item, ownedQuantities);
        return sum + (toBuy * (item.meta?.price || 0));
    }, 0);

    return groupedTotal + nonGroupedTotal;
}
