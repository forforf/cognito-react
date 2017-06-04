import React from "react";
import { connect } from 'react-redux';
import { setAwsUserConfig } from "Actions/ActionIndex"
import './Aws.css';


class ConfigForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.awsUserConfig);
  }

  componentWillReceiveProps (props) {
    this.setState(props.awsUserConfig);
  }

  onChangeName = (e) => {
    this.setState({user: e.target.value})
  };

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  };

  onChangeRegion = (e) => {
    this.setState({region: e.target.value})
  };

  onChangeS3Bucket = (e) => {
    this.setState({s3bucket: e.target.value})
  };
  //
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(setAwsUserConfig(this.state));
  };

  render() {
    return (
        <form className="Aws" onSubmit={this.handleSubmit}>
          <label>Account Default Settings</label>
          <input id="config-region"
                 type="text"
                 value={this.state.region}
                 placeholder="Region"
                 onChange={this.onChangeRegion}/>
          <input id="config-s3bucket"
                 type="text"
                 value={this.state.s3bucket}
                 placeholder="S3 Bucket"
                 onChange={this.onChangeS3Bucket}/>
          <input id="config-username"
                 type="text"
                 value={this.state.user}
                 placeholder="Default Name"
                 onChange={this.onChangeName}/>
          <input id="config-email"
                 type="text"
                 value={this.state.email}
                 placeholder="Default Email"
                 onChange={this.onChangeEmail}/>
          <input type="submit"/>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { awsUserConfig: state.awsUserConfig };
};

export default connect(mapStateToProps)(ConfigForm);
