
import { useEffect, useState } from 'react';
import './App.css'
import { CardCategories } from './components/CardCategories'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { CategoryInterface } from './shared/interfaces/Category.interface';
import { FormCategory } from './components/FormCategory';

function App() {

  const [categories, setCategories] = useState<CategoryInterface[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': 'admin'
      }
    })
      .then(res => res.json())
      .then((data: CategoryInterface[]) => {
        setCategories(data)
      })
  }, []);

  return (

    <main className="bg-gray-50 dark:bg-gray-900">
      {/* <Login/> */}
      {/* <Register /> */}
      <FormCategory/>
      {
        categories?.map((category) => {          
          return (
            <CardCategories
            key={category.name}
              name={category.name}
              description={category.description}
              image={category.image}
              allowedFileTypes={category.allowedFileTypes}
            />
          )
        })
      }
    </main>
  )
}

export default App
