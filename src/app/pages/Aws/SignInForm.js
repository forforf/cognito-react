import React from "react";
import { connect } from 'react-redux';
import { tryCognitoSignIn } from "Actions/ActionIndex"
import './Aws.css';


class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.cognito = this.props.awsCognitoAccount;
    this.region = this.props.awsUserConfig.region;
    this.state = {
      user: this.getUser(props),
      password: '',
      messages: this.getMessages(props),
      status: this.getStatus(props),
    };
  }

  getMessages(props) {
    const messages = ((props||{}).awsCognitoSignin||{}).messages || [];
    return messages;
  }

  getStatus(props) {
    const status = ((props||{}).awsCognitoAccount||{}).signinStatus || '';
    return status;
  }

  getUser(props) {
    const user = ((props||{}).awsUserConfig||{}).user || '';
    return user;
  }

  handleNameChange(e) {
    this.setState({user: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let cognitoRequest = Object.assign({}, this.cognito);
    cognitoRequest.user = this.state.user;
    cognitoRequest.password = this.state.password;
    cognitoRequest.region = this.region;
    let messages = Object.assign({}, this.state.messages);
    this.props.dispatch(tryCognitoSignIn({cognitoRequest, messages}));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({messages: this.getMessages(nextProps)});
    this.setState({status: this.getStatus(nextProps)});
    this.setState({user: this.getUser(nextProps)});
    this.region = nextProps.awsUserConfig.region;
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
          <label>Sign In</label>
          <input id="signin-username"
                 type="text"
                 value={this.state.user}
                 placeholder="Name"
                 onChange={this.handleNameChange.bind(this)}/>
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)}/>
          <input type="submit"/>
          <p><b>Status:</b> <span id="signin-status">{this.state.status}</span> </p>

          <h4>Messages:</h4>
          <ul id="signin-messages">{messages}</ul>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    awsCognitoAccount: state.awsCognitoAccount,
    awsCognitoSignin: state.awsCognitoSignin,
    awsUserConfig: state.awsUserConfig
  };
};

export default connect(mapStateToProps)(SignInForm);
