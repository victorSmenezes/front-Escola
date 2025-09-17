import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import history from './services/hystory';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyles />
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
