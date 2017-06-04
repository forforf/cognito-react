import React from "react";
import { connect } from 'react-redux';
import { tryCognitoRegister } from "Actions/ActionIndex"
import './Aws.css';
import _ from 'lodash/object';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.awsCognitoAccount = props.awsCognitoAccount;
    this.awsUserConfig = props.awsUserConfig;
    this.state = {
      user: this.getUser(props),
      email: this.getEmail(props),
      messages: this.getMessages(props),
      status: this.getStatus(props),
      password: ''
    };
  }

  getEmail(props) {
    return  _.get(props, "awsUserConfig.email");
  }

  getMessages(props) {
    return _.get(props, "awsCognitoSignup.messages");
  }

  getStatus(props) {
    return _.get(props, "awsCognitoAccount.signupStatus");
  }

  getUser(props) {
    return  _.get(props, "awsUserConfig.user");
  }

  handleNameChange(e) {
    this.setState({user: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const signupData = {};
    signupData.awsCognitoAccount = this.awsCognitoAccount;
    signupData.awsUserConfig = this.awsUserConfig;
    signupData.awsUserConfig.user = this.state.user;
    signupData.awsUserConfig.email = this.state.email;
    signupData.awsUserConfig.password = this.state.password;
    this.props.dispatch(tryCognitoRegister({signupData}));
  }

  componentWillReceiveProps(nextProps) {
    this.awsCognitoAccount = nextProps.awsCognitoAccount;
    this.awsUserConfig = nextProps.awsUserConfig;
    this.setState({user: this.getUser(nextProps)});
    this.setState({email: this.getEmail(nextProps)});
    this.setState({messages: this.getMessages(nextProps)});
    this.setState({status: this.getStatus(nextProps)});
  }

  limitSize(ar, max) {
    if (typeof ar === 'undefined') {
      return [];
    }
    if (ar.length > max){
      const excess = ar.length - max;
      ar.splice(0, excess)
    }
    return ar;
  }
  
  render() {
    // maximum 5 messages
    const messages = this.limitSize(this.state.messages, 5).map((msg, idx) =>
        <li key={idx}>{msg}</li>
    );

    return (
        <form className="Aws" onSubmit={this.handleSubmit.bind(this)}>
          <label>Register</label>
          <input id="signup-username"
                 type="text"
                 value={this.state.user}
                 placeholder="Name"
                 onChange={this.handleNameChange.bind(this)}/>
          <input id="signup-email"
                 type="text"
                 value={this.state.email}
                 placeholder="Email"
                 onChange={this.handleEmailChange.bind(this)}/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)}/>
          <input type="submit"/>
          <p><b>Status:</b> <span id="signup-status">{this.state.status}</span> </p>

          <h4>Messages:</h4>
          <ul id="signup-messages">{messages}</ul>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    awsUserConfig: state.awsUserConfig,
    awsCognitoSignup: state.awsCognitoSignup,
    awsCognitoAccount: state.awsCognitoAccount
  };
};

export default connect(mapStateToProps)(SignUpForm);
