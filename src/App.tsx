import './App.css'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { FormCategory } from './components/FormCategory';
import { Dashboard } from './pages/Dashboard';
import { Content } from './pages/Content';

function App() {

  return (

    <main className="min-h-screen flex justify-center content-center bg-gray-50 dark:bg-gray-900">
      {/* <Login/> */}
      {/* <Register /> */}
      {/* <FormCategory/> */}
      <Content/>

    </main>
  )
}

export default App
