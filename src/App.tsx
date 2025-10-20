import React  from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import Home from './pages/Home';
import City from './pages/City';

const App:React.FC = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>} />
        <Route path='city' element={<City/>} />
      </Route>
    )
  )
  return (
    <div
  style={{ backgroundImage: "url('/images/bg2.jpg')" }}
  className="bg-cover bg-center bg-no-repeat min-h-screen text-white font-poppins overflow-y-scroll">
  <RouterProvider router={router}/>
    </div>
  );
}

export default App;
