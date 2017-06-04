import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import {Tabs, Tab} from 'material-ui/Tabs';
import NavBar from 'app/container/NavBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('NavBar', () => {

  let Component;

  const tabs = {
    home: { label: 'Home', link: '/'},
    about: {label: 'About', link: '/about'}
  };


  beforeEach(() => {
    const store = FakeStore({});

    const wrapper = mount(
        <MuiThemeProvider>
          <Provider store={store}>
            <NavBar />
          </Provider>
        </MuiThemeProvider>
    );

    Component = wrapper.find(NavBar);
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('has Tabs', () => {
    expect(Component.find(Tab).length).toBeGreaterThan(0);
  });

  // Iterate over the tabs we expect and build the appropriate tests
  Object.keys(tabs).forEach(function (tab) {

    describe("Tab: " + tab, () => {

      it(`links ${tabs[tab].link} with the ${tabs[tab].label} label`, () => {
        let tabWrapper = Component.findWhere(n => n.prop('label') === tabs[tab].label && typeof n.prop('containerElement'));
        expect(tabWrapper).toBeTruthy();

        let tabDestination = (((( tabWrapper|| {}).props() || {}).containerElement || {} ).props || {}).to;
        expect(tabDestination).toBe(tabs[tab].link);
      })
    })
  });
});
