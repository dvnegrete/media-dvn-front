import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MediaDVNProvider } from './Context/index.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MediaDVNProvider>
        <App />
      </MediaDVNProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
