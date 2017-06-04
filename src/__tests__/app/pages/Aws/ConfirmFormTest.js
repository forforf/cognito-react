import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount } from 'enzyme';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import ConfirmForm from 'app/pages/Aws/ConfirmForm'

const makeComponent = () => {

  const awsCognitoAccount = {confirmStatus:'Not Started'};
  const awsUserConfig = {user:  'MrFoo', email: 'foo@example.com'};
  const awsCognitoConfirm = {messages: ['hello!!', 'there']};

  const store = FakeStore(
      {awsCognitoAccount, awsUserConfig, awsCognitoConfirm}
  );

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <ConfirmForm />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(ConfirmForm);
};

describe('ConfirmForm', () => {
  let Component;

  beforeEach(() => {
    Component = makeComponent();
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it('renders username', () => {
    expect(Component.find('#confirm-username').props().value).toEqual('MrFoo');
  });

  it('renders code', () => {
    expect(Component.find('#confirm-code').length).toBeTruthy();
  });

  it('renders status', () => {
    expect(Component.find('#confirm-status').text()).toEqual('Not Started');
  });

  it('renders messages', () => {
    expect(Component.find('#confirm-messages').childAt(0).text()).toEqual('hello!!');
    expect(Component.find('#confirm-messages').childAt(1).text()).toEqual('there');
  });

  describe.skip('Submit', () => {
    //ToDo: Figure out how to test submit
  });
});
