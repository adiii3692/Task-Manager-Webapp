import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateTask from './pages/CreateTask.jsx';
import UpdateTask from './pages/UpdateTask.jsx';
import DeleteTask from './pages/DeleteTask.jsx';
import Logout from "./pages/Logout.jsx";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/create/:id' element={<CreateTask/>}></Route>
      <Route path='/update/:id' element={<UpdateTask/>}></Route>
      <Route path='/delete/:id' element={<DeleteTask/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
    </Routes>
  );
};

export default App;
