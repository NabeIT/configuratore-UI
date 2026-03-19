import React from 'react';

const ActionContext = React.createContext();


const actions = {
    REMOVE_ITEM: 'removeItem',
    SELECT_ITEM: 'selectItem',
    CLEAR_SCENE: 'clearScene',
    DESELECT_ALL: "deselectAll"
}

const ActionProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);

    const [action, setAction] = React.useState(null);

    const performAction = (type, payload) => {
        setAction({ type, payload });
    }

    const clearAction = () => setAction(null);
    return (
        <ActionContext.Provider value={{ selectedItem, setSelectedItem, action, performAction, clearAction }}>
            {children}
        </ActionContext.Provider>
    );
};


const useActionContext = () => {
    const context = React.useContext(ActionContext);
    if (!context) {
        throw new Error('useActionContext must be used within an ActionProvider');
    }
    return context;
}

export { ActionProvider, actions, useActionContext };
export default ActionContext;