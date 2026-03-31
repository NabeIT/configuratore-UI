import libreria from "../libreria";

// Libreria Medium: Small + Espansione con 3 mensole
export default {
  id: "medium",
  name: "Libreria Medium",
  description: "Espandi la base con un modulo aggiuntivo e 3 mensole extra.",
  image:
    "https://cdn.shopify.com/s/files/1/0659/2708/6299/files/LIBRERIA_16877_573b9109-4140-4bee-b335-75cb5f81fb48.webp?v=1770894627",
  steps: [
    {
      ...libreria.find((i) => i.modelId === "cubo-scaffale"),
      variant: 1,
      id: "startup-cubo-scaffale",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-cubo-scaffale-dz-appoggio-mensola-2",
    },

    {
      ...libreria.find((i) => i.modelId === "espansione-cubo-scaffale"),
      variant: 1,
      id: "startup-espansione-cubo-scaffale",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-dz-appoggio-mensola-9",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-dz-appoggio-mensola-1",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-espansione-cubo-scaffale-dz-appoggio-mensola-5",
    },

    {
      ...libreria.find((i) => i.modelId === "mensola60"),
      variant: 1,
      targetZoneKey: "startup-cubo-scaffale-dz-appoggio-mensola-6",
    },
  ],
};
