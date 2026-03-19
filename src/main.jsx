import './index.css'

import { ActionProvider } from './components/ActionContext.jsx'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ActionProvider >
    <App />
  </ActionProvider>
  // </StrictMode>,
)
