import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from './components/MainComponent' ;
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
