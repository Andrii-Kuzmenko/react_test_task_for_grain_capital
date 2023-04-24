import React, { useEffect } from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAppDispatch } from './app/hooks';
import * as usersActions from './features/users/usersSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />

      </header>

      <main className="main">
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
