import {Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from "./context/AuthContext";


import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";
import { AdminRoom } from './pages/AdminRoom';







export default function App() {

  return (

  <AuthContextProvider>

   <Routes>
    <Route path="/" index element={<Home/>}/>
    <Route path="/rooms/new" index element={<NewRoom/>}/>
    <Route path="/rooms/:id" element={<Room/>}/>

    <Route path="/admin/rooms/:id" element={<AdminRoom/>}/>

    </Routes>
  </AuthContextProvider>



  );

};

