import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Home from './src/screens/Home/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
