import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('No se encontr� el elemento root')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
