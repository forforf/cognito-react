import React from 'react';
import ReactDOM from 'react-dom';
import util from 'util';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import MenuItemLink from 'app/container/MenuItemLink';
import Account from 'app/container/Account';
import ReactTestUtils from 'react-dom/test-utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const makeComponent = (menuLinks) => {
  const store = FakeStore({});

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <Account menuLinks={menuLinks} />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(Account);
};

describe('Account', () => {

  let Component;
  let menuLinks;
  let wrapper;

  beforeEach(() => {
    const store = FakeStore({});

    menuLinks = [
      {destination: '/config', label: 'Settings'},
      {destination: '/signup', label: 'Register'},
      {destination: '/confirm', label: 'Confirm'},
      {destination: '/signin', label: 'Sign In'},
    ];

    wrapper = makeComponent(menuLinks);

    Component = wrapper.find(Account);
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('has an account menu', () => {
    expect(Component.find(IconMenu).length).toBe(1);
  });

  describe("Page Links", () => {

    it('has a MenuItemLinks', () => {
      expect(Component.find('button').length).toBe(1);
      Component.find('button').simulate('click');
      // expect to see menu with links, but can't figure out how to get it to work
    });
  });
});
