import './App.css'
import { AppRoute } from './router/AppRoute';
import { SideBar } from './components/SideBar';
import { useContext, useEffect } from 'react';
import { MediaDVNContext } from './Context';


function App() {
  const context = useContext(MediaDVNContext);

  useEffect(() => {
    const isThereARegisteredUser = localStorage.getItem('user');
    if (isThereARegisteredUser) {
      context?.setLogin(true);
    }
  }, []);
  return (
    <>
      <SideBar />
      <main className="flex justify-center content-center bg-gray-50 dark:bg-gray-900 p-4 sm:ml-64 min-h-screen">
        <AppRoute />
      </main>
    </>
  )
}

export default App
