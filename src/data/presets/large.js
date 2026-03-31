import libreria from "../libreria";
import medium from "./medium";
// Libreria Large: Medium + seconda espansione con altre 3 mensole
export default {
  id: "large",
  name: "Libreria Large",
  description: "La configurazione completa con due espansioni e 6 mensole.",
  image:
    "https://cdn.shopify.com/s/files/1/0659/2708/6299/files/LIBRERIA_16877_e48b2368-c0e3-4877-a6db-563a60b2f87b.webp?v=1770894628",
  steps: [
    ...medium.steps,
    {
      ...libreria.find((i) => i.modelId === "espansione-cubo-scaffale"),
      id: "startup-espansione-cubo-scaffale-2",
      variant: 1,
      targetZoneKey:
        "startup-espansione-cubo-scaffale-dz-expansion-left-expansion",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-2-dz-appoggio-mensola-9",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-2-dz-appoggio-mensola-1",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-2-dz-appoggio-mensola-5",
    },
  ],
};
