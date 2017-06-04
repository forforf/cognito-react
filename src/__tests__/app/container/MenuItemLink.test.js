import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import MenuItem from 'material-ui/MenuItem';
import MenuItemLink from 'app/container/MenuItemLink';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const makeComponent = (linkInfo) => {
  const store = FakeStore({});

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <MenuItemLink link={linkInfo} />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(MenuItemLink);
};

describe('MenuItemLink', () => {

  let Component;

  beforeEach(() => {
    Component = makeComponent({destination: '/url', label:'SomePage'});
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('has MenuItem', () => {
    expect(Component.find(MenuItem).length).toBe(1);
  });

  it('has a destination', () => {
    expect(Component.props().link).toBeTruthy();
    expect(Component.props().link.destination).toBe('/url');
  });

  it('has a label', () => {
    expect(Component.props().link).toBeTruthy();
    expect(Component.props().link.label).toBe('SomePage');
  })
});
