import 'rxjs';
import React, { Component } from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import About     from 'app/pages/About/About';
import Home      from 'app/pages/Home/Home';
import SignUpForm      from 'app/pages/Aws/RegisterForm';
import SignInForm      from 'app/pages/Aws/SignInForm';
import ConfirmForm     from 'app/pages/Aws/ConfirmForm';
import ConfigForm      from 'app/pages/Aws/ConfigForm';

class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.container = this.props.container;
  }

  render() {

    const ConfigFormWrapper = (props) => {
      return <ConfigForm/>;
    };

    const ConfirmFormWrapper = (props) => {
      return <ConfirmForm/>;
    };

    const SignInFormWrapper = (props) => {
      return <SignInForm/>;
    };

    const SignUpFormWrapper = (props) => {
      return <SignUpForm/>;
    };

    return (
      <Router history={hashHistory}>
        <Route path="/" component={this.container}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/signup" component={SignUpFormWrapper}/>
        <Route path="/signin" component={SignInFormWrapper}/>
        <Route path="/confirm" component={ConfirmFormWrapper}/>
        <Route path="/config" component={ConfigFormWrapper}/>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
