import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import NavBar from 'app/container/NavBar';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import Container from 'app/Container';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('Container', () => {

  let Component;


  beforeEach(() => {
    const store = FakeStore({});

    const wrapper = mount(
        <MuiThemeProvider>
          <Provider store={store}>
            <Container />
          </Provider>
        </MuiThemeProvider>
    );

    Component = wrapper.find(Container);
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('has AppBar', () => {
    expect(Component.find(AppBar).length).toBe(1);
  });

  it('has NavBar', () => {
    expect(Component.find(NavBar).length).toBe(1);
  });
});
