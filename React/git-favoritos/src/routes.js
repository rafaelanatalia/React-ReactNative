import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Main from './pages/Main';
import Repositorio from './pages/Repositorio';

export default function Router(){
  return(
    
      <Routes>
        <Route index path="/" element={<Main/>} />
        <Route index path="/repositorio/:repositorio" element={<Repositorio/>} />
      </Routes>
   
  );
}