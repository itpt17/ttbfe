import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider} from 'react-redux';
import { createStore} from 'redux';
import Reducers from './reducers/index';

const store = createStore(Reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
