import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      s3objects: []
    };
  }

  componentDidMount() {
    const aws = this.props.aws || {};
    const S3 = aws.S3 && new aws.S3();

    if (S3) {
      S3.listObjects({Bucket: this.props.bucket}, (err, data) => {
        if (err) {
          console.error('S3 Error', err);
        } else {
          // Here's where we finally get the AWS resource
          this.setState({s3objects: data});
        }
      });
    }
  }

  render() {
    const s3objects = this.state.s3objects || {};
    const bucketName = s3objects.Name || '- Nothing Fetched Yet -';
    const objectNames = (s3objects.Contents || []).map((s3content, idx) =>
        <li key={idx}>{ (s3content||{}).Key }</li>
    );
    return (
        <div className="wrapper" >
          <h3>react-cognito</h3>
          <div className="row">

            <div className="col-1-3" >
              <h4>Bucket:  {bucketName}</h4>
              <ul>{objectNames}</ul>
            </div>

          </div>
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return { aws: state.awsCognitoAccount.awsApi, bucket: state.awsUserConfig.s3bucket };
};

export default connect(mapStateToProps)(Home);
