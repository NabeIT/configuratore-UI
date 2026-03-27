import './index.css'

import { ActionProvider } from './components/ActionContext.jsx'
import App from './App.jsx'
import { StateProvider } from './components/StateContext.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('configurator:root')).render(
  // <StrictMode>
  <StateProvider>
    <ActionProvider >
      <App />
    </ActionProvider>
  </StateProvider>
  // </StrictMode>,
)
