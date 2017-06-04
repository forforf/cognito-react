import React from "react";
import { connect } from 'react-redux';
import { tryConfirmCognitoUser } from "Actions/ActionIndex"
import './Aws.css';


class ConfirmForm extends React.Component {
  constructor(props) {
    super(props);

    this.awsCognitoAccount = this.props.awsCognitoAccount;
    this.state = {
      user: this.getUser(props),
      code: '',
      messages: this.getMessages(props),
      status: this.getStatus(props),
    };
  }

  getMessages(props) {
    const messages = ((props||{}).awsCognitoConfirm||{}).messages || [];
    return messages;
  }

  getStatus(props) {
    const status = ((props||{}).awsCognitoAccount||{}).confirmStatus || '';
    return status;
  }

  getUser(props) {
    const user = ((props||{}).awsUserConfig||{}).user || '';
    return user;
  }

  handleNameChange(e) {
    this.setState({user: e.target.value});
  }

  handleCodeChange(e) {
    this.setState({code: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const confirmData = {
      awsCognitoAccount: this.awsCognitoAccount,
      awsUser: this.state.user,
      awsCode: this.state.code
    };

    this.props.dispatch(tryConfirmCognitoUser({confirmData}));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({messages: this.getMessages(nextProps)});
    this.setState({status: this.getStatus(nextProps)});
    this.setState({user: this.getUser(nextProps)});
  }

  limitSize(ar, max) {
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
          <label>Confirm Account</label>
          <input id="confirm-username"
                 type="text"
                 value={this.state.user}
                 placeholder="Name"
                 onChange={this.handleNameChange.bind(this)}/>
          <input id="confirm-code"
                 type="text"
                 value={this.state.code}
                 placeholder="Code"
                 onChange={this.handleCodeChange.bind(this)}/>
          <input type="submit"/>

          <p><b>Status:</b> <span id="confirm-status">{this.state.status}</span> </p>

          <h4>Messages:</h4>
          <ul id="confirm-messages">{messages}</ul>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    awsCognitoAccount: state.awsCognitoAccount,
    awsCognitoConfirm: state.awsCognitoConfirm,
    awsUserConfig: state.awsUserConfig

  };
};

export default connect(mapStateToProps)(ConfirmForm);



