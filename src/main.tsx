import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { GamesProvider } from './games/GamesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GamesProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </GamesProvider>
  </StrictMode>,
)
