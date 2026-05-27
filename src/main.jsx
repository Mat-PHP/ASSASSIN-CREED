import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <--- IMPORTANTE: Adicione esta linha
import App from './App.jsx'
import './index.css'
import { GameProvider } from './context/GameContext' // Garanta que o nome do Provider está correto

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter> {/* <--- ENVOLVA O APP COM O BROWSERROUTER */}
        <App />
      </BrowserRouter>
    </GameProvider>
  </React.StrictMode>,
)
