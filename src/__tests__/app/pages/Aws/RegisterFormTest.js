import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import RegisterForm from 'app/pages/Aws/RegisterForm'

const makeComponent = () => {

  const awsCognitoAccount = {signupStatus:'Not Started'};
  const awsUserConfig = {user:  'MrFoo', email: 'foo@example.com'};
  const awsCognitoSignup = {messages: ['hello!!', 'there']};

  const store = FakeStore(
      {awsCognitoAccount, awsUserConfig, awsCognitoSignup}
  );

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <RegisterForm />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(RegisterForm);
};

describe('RegisterForm', () => {
  let Component;

  beforeEach(() => {
    Component = makeComponent();
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('renders username', () => {
    expect(Component.find('#signup-username').props().value).toEqual('MrFoo');
  });

  it('renders email', () => {
    expect(Component.find('#signup-email').props().value).toEqual('foo@example.com');
  });

  it('renders status', () => {
    expect(Component.find('#signup-status').text()).toEqual('Not Started');
  });

  it('renders messages', () => {
    expect(Component.find('#signup-messages').childAt(0).text()).toEqual('hello!!');
    expect(Component.find('#signup-messages').childAt(1).text()).toEqual('there');
  });

  describe.skip('Submit', () => {
    //ToDo: Figure out how to test submit
  });
});
