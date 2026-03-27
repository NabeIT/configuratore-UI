import libreria from "../libreria";

// Libreria Small: Base modulare + Mensola montessoriana
export default {
  id: "small",
  name: "Libreria Small",
  description:
    "Base modulare con mensola montessoriana. Il punto di partenza perfetto.",
  image:
    "https://cdn.shopify.com/s/files/1/0659/2708/6299/files/ripiani_vert_e_or_1.gif?v=1770908071",
  steps: [
    libreria.find((i) => i.modelId === "cubo-scaffale"),
    libreria.find((i) => i.modelId === "mensola-montessoriana"),
    // { modelId: "cubo-scaffale", delay: 0,

    //  },
    // { modelId: "mensola-montessoriana", delay: 500 },
  ],
};
