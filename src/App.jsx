import React from 'react';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App
