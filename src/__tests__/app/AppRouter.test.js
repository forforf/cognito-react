import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import FakeStore from '__test_helpers__/FakeData/FakeStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from 'app/Container';
import { Router, Route  } from 'react-router';
import AppRouter from 'app/AppRouter'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const makeComponent = (container) => {
  const store = FakeStore(
    {
      awsCognitoAccount: {
        awsApi: 'FakeApi'
    },
      awsUserConfig: {
        s3bucket: 'Fake S3 Bucket'
      }
    }
  );

  const wrapper = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <AppRouter container={container} />
        </Provider>
      </MuiThemeProvider>
  );

  return wrapper.find(AppRouter);
};

describe('AppRouter', () => {
  let Component;

  beforeEach(() => {
    Component = makeComponent(Container);
  });

  it('renders', () => {
    expect(Component.length).toBeTruthy();
  });

  it.skip('has Routes', () => {
    //ToDo Figure out how to test routes
  });
});
