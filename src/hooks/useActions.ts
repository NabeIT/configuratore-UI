const useActions = () => {
  return {
    addItem: (item) => {
      console.log("Aggiungi elemento:", item);
    },
    removeItem: (itemId) => {
      console.log("Rimuovi elemento con ID:", itemId);
    },
    moveItem: (itemId, newPosition) => {
      console.log(
        `Sposta elemento con ID ${itemId} alla posizione`,
        newPosition,
      );
    },
  };
};
