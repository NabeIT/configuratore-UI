import libreria from "../libreria";

const cubo = libreria.find((i) => i.modelId === "cubo-scaffale");
const mensola = libreria.find((i) => i.modelId === "mensola-montessoriana");

console.log("Cubo", {
  ...cubo,
  ...cubo.variants[1],
  id: "startup-cubo-scaffale-small",
});
// Libreria Small: Base modulare + Mensola montessoriana
export default {
  id: "small",
  name: "Libreria Small",
  description:
    "Base modulare con mensola montessoriana. Il punto di partenza perfetto.",
  image:
    "https://cdn.shopify.com/s/files/1/0659/2708/6299/files/ripiani_vert_e_or_1.gif?v=1770908071",
  steps: [
    {
      ...cubo,
      variant: 1,
      id: "startup-cubo-scaffale-small",
    },
    {
      ...libreria.find((i) => i.modelId === "mensola-montessoriana80"),
      variant: 0,
      targetZoneKey:
        "startup-cubo-scaffale-small-dz-appoggio-mensola-montessoriana",
    },

    // libreria.find((i) => i.modelId === "cubo-scaffale"),
    // libreria.find((i) => i.modelId === "mensola-montessoriana"),
    // { modelId: "cubo-scaffale", delay: 0,

    //  },
    // { modelId: "mensola-montessoriana", delay: 500 },
  ],
};
