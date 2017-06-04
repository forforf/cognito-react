import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import App from 'app/App';
import { Provider } from 'react-redux';
import { Router, Route  } from 'react-router';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('App', () => {

  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
          <App />
      );
    }
    return mountedApp;
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('has a provider', () => {
    expect(app().find(Provider).length).toBe(1);
  });

  it('has a router', () => {
    expect(app().find(Router).length).toBe(1);

  });
});
