import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
// import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>

      <div className="App">

        <MainPages />
      </div>

    </Provider>
  );
}

export default App;
