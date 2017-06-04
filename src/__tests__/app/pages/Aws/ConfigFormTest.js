import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import ConfigForm from 'app/pages/Aws/ConfigForm'

const makeComponent = () => {

  const awsUserConfig = {
    region: 'some-region-1',
    s3bucket: 'maBucket',
    user:  'MrFoo',
    email: 'foo@example.com'};

  const store = FakeStore(
      {awsUserConfig}
  );

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <ConfigForm />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(ConfigForm);
};

describe('ConfigForm', () => {
  let Component;

  beforeEach(() => {
    Component = makeComponent();
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('renders region', () => {
    expect(Component.find('#config-region').props().value).toEqual('some-region-1');
  });

  it('renders s3 bucket', () => {
    expect(Component.find('#config-s3bucket').props().value).toEqual('maBucket');
  });

  it('renders username', () => {
    expect(Component.find('#config-username').props().value).toEqual('MrFoo');
  });

  it('renders email', () => {
    expect(Component.find('#config-email').props().value).toEqual('foo@example.com');
  });

  describe.skip('Submit', () => {
    //ToDo: Figure out how to test submit
  });
});
