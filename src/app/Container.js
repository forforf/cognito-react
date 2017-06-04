
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import NavBar from 'app/container/NavBar';
import Account from 'app/container/Account'
import { connect } from 'react-redux';


const AccountWrapper = (props) => {
 const menuLinks = [
      {destination: '/config', label: 'Settings'},
      {destination: '/signup', label: 'Register'},
      {destination: '/confirm', label: 'Confirm'},
      {destination: '/signin', label: 'Sign In'},
    ];

  return <Account menuLinks={menuLinks}/>;
};

class Container extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'APP_INIT'});
  }

  render() {
    return (
        <div>
          <AppBar
              title="react-cognito"
              showMenuIconButton={false}
              onLeftIconButtonTouchTap={this.handleToggle}
              iconElementRight={<AccountWrapper/>}
          />
          <NavBar />
          {this.props.children}
        </div>
    )
  }
}


// This is a bit of voodoo I need to understand better
// We need it so that redux works for the rest of the app
const mapStateToProps = (state) => {
  return {
    foo: state
  };
};

export default connect(mapStateToProps)(Container);
