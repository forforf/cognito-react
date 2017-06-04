import Rx from "rxjs/Rx";
import AWS from "aws-sdk";
/* Required even though it appears they are not used */
import {CognitoUserPool, CognitoUserAttribute} from "amazon-cognito-identity-js"; // eslint-disable-line no-unused-vars


const registerUserCallback = (state, callback) => {
  const signupData = state.signupData;

  const poolData = {
    ClientId: signupData.awsCognitoAccount.AppClientId,
    UserPoolId:  signupData.awsCognitoAccount.UserPoolId
  };

  let attributes = [];

  let emailData = {
    Name: 'email',
    Value: signupData.awsUserConfig.email
  };

  let nameData = {
    Name: 'name',
    Value: signupData.awsUserConfig.user
  };

  attributes.push(new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(emailData));
  attributes.push(new AWS.CognitoIdentityServiceProvider.CognitoUserAttribute(nameData));


  const user = signupData.awsUserConfig.user;
  const password = signupData.awsUserConfig.password;
  const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  userPool.signUp(user, password, attributes, null, callback);
};

const confirmUserCallback = (action, callback) => {

  const awsState = action.awsState;

  const poolData = {
    UserPoolId: awsState.awsCognitoAccount.UserPoolId,
    ClientId: awsState.awsCognitoAccount.AppClientId
  };

  const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  const userData = {
    Username: awsState.awsUser,
    Pool: userPool
  };

  const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);

  cognitoUser.confirmRegistration(awsState.awsCode, true, callback);
};

// Requires:
// identityPoolId
// userPoolId
// appClientId
// user name
// user password
const signInUserCallback = (action, callback) => {

  const cognitoRequest = action.cognitoRequest;

  // Needed for some reason
  AWS.config.update({accessKeyId: 'mrFoo', secretAccessKey: 'mrBar', region: cognitoRequest.region });

  const identityPoolId = cognitoRequest.identityPoolId;
  const poolData = {
    UserPoolId: cognitoRequest.UserPoolId,
    ClientId: cognitoRequest.AppClientId
  };
  
  let authData = {
      Username: cognitoRequest.user,
      Password: cognitoRequest.password
    };

  let authDetails = new AWS.CognitoIdentityServiceProvider.AuthenticationDetails(authData);

  const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  const userData = {
    Username: cognitoRequest.user,
    Pool: userPool
  };

  const cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => {

      const logins = `cognito-idp.${AWS.config.region}.amazonaws.com/${poolData.UserPoolId}`;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: identityPoolId,
        Logins : {
          [logins]: result.getIdToken().getJwtToken()
        }
      });

      //call refresh method in order to authenticate user and get new temp credentials
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error('Refresh Error', error)
        } else {
          // console.log('Refresh Successful!');
        }
      });
      
      callback(null, AWS);
    },

    mfaRequired: function(codeDeliveryDetails) {
      const err = 'Cognitor says MFA is required, but that is not supported yet';
      callback(err);
    },

    newPasswordRequired: function(userAttributes, requiredAttributes) {
      // User was signed up by an admin and must provide new
      // password and required attributes, if any, to complete
      // authentication.
;
      // userAttributes: object, which is the user's current profile. It will list all attributes that are associated with the user.
      // Required attributes according to schema, which don’t have any values yet, will have blank values.
      // requiredAttributes: list of attributes that must be set by the user along with new password to complete the sign-in.
      console.warn('Need to reset password');
      console.warn("Required Attributes", requiredAttributes);
      const newPassword = prompt("This is an utter and complete hack for resetting the password. Enter your new password here", "");
      const attributesData = {};

      // Get these details and call
      // newPassword: password that user has given
      // attributesData: object with key as attribute name and value that the user has given.
      // This will call the onSuccess or onFailure methods of, well, this
      cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)

    },

    onFailure: (err) => {
      console.error('AwsCognito Error: ', err);
      callback(err)
    }
  });
};


// returns a function that returns an observable
export const confirmUser  = Rx.Observable.bindNodeCallback(confirmUserCallback);
export const registerUser = Rx.Observable.bindNodeCallback(registerUserCallback);
export const signInUser   = Rx.Observable.bindNodeCallback(signInUserCallback);
