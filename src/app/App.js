import 'rxjs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'app/ConfigureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRouter from 'app/AppRouter'
import Container from 'app/Container';

const store = configureStore();

class App extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <AppRouter container={Container}/>
        </Provider>
      </MuiThemeProvider>
    );
  }
}


export default App;
