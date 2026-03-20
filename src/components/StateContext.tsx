import React from 'react';

type StateContextType = {
    selectedItem: any;
    setSelectedItem: (item: any) => void;
    editedItem: any;
    setEditedItem: (item: any) => void;

}
const StateContext = React.createContext<StateContextType>({} as StateContextType);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [editedItem, setEditedItem] = React.useState(null);

    const sceneState: StateContextType = {
        selectedItem,
        setSelectedItem,
        editedItem,
        setEditedItem
    };

    return (
        <StateContext.Provider value={sceneState}>
            {children}
        </StateContext.Provider>
    );
};

const useStateContext = () => {
    const context = React.useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
}

export { StateProvider, useStateContext };
export default StateContext;