import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { updateThemeColor } from './utils/themeUtils'

import './index.css'
import App from './App.tsx'

updateThemeColor()
// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
