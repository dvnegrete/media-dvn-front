import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { AppRoute } from './router/AppRoute';
import { SideBar } from './components/SideBar';
import { MediaDVNProvider } from './Context';


function App() {
  return (
    <MediaDVNProvider>
      <BrowserRouter>
        <SideBar />
        <main className="flex justify-center content-center bg-gray-50 dark:bg-gray-900 p-4 sm:ml-64 min-h-screen">
          <AppRoute />
        </main>
      </BrowserRouter>
    </MediaDVNProvider>

  )
}

export default App
