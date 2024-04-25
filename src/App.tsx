import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { AppRoute } from './router/AppRoute';
import { SideBar } from './components/SideBar';
import { useContext, useEffect } from 'react';
import { MediaDVNContext } from './Context';
import { ContentProvider } from './Context/ContentContext';


function App() {
  const context = useContext(MediaDVNContext);

  useEffect(() => {
    const isThereARegisteredUser = localStorage.getItem('user');
    if (isThereARegisteredUser) {
      console.log("hay sesion activa");
      context?.setLogin(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <SideBar />
      <main className="flex justify-center content-center bg-gray-50 dark:bg-gray-900 p-4 sm:ml-64 min-h-screen">
        <ContentProvider>
          <AppRoute />
        </ContentProvider>
      </main>
    </BrowserRouter>
  )
}

export default App
