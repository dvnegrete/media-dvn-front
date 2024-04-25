import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MediaDVNProvider } from './Context/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MediaDVNProvider>
      <App />
    </MediaDVNProvider>
  </React.StrictMode>,
)
