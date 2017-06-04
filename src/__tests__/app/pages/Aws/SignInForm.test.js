import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import SignInForm from 'app/pages/Aws/SignInForm'

const makeComponent = () => {

  const awsCognitoAccount = {signinStatus:'Not Started'};
  const awsUserConfig = {user:  'MrFoo'};
  const awsCognitoSignin = {messages: ['hello!!', 'there']};

  const store = FakeStore(
      {awsCognitoAccount, awsUserConfig, awsCognitoSignin}
  );

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(SignInForm);
};

describe('SignInForm', () => {
  let Component;

  beforeEach(() => {
    Component = makeComponent();
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('renders username', () => {
    expect(Component.find('#signin-username').props().value).toEqual('MrFoo');
  });

  it('renders status', () => {
    expect(Component.find('#signin-status').text()).toEqual('Not Started');
  });

  it('renders messages', () => {
    expect(Component.find('#signin-messages').childAt(0).text()).toEqual('hello!!');
    expect(Component.find('#signin-messages').childAt(1).text()).toEqual('there');
  });

  describe.skip('Submit', () => {
    //ToDo: Figure out how to test submit
  });
});
