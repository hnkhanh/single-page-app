import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from './components/MainComponent' ;
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
};

export default App;