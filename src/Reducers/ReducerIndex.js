import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import awsUserConfigReducer from './awsUserConfigReducer';
import awsCognitoAccountReducer from './awsCognitoAccountReducer';
import awsCognitoConfirmReducer from './awsCognitoConfirmReducer';
import awsCognitoSigninReducer from './awsCognitoSigninReducer';
import awsCognitoSignupReducer from './awsCognitoSignupReducer';


export default combineReducers({
  awsCognitoAccount: awsCognitoAccountReducer,
  awsUserConfig: awsUserConfigReducer,
  awsCognitoConfirm: awsCognitoConfirmReducer,
  awsCognitoSignin: awsCognitoSigninReducer,
  awsCognitoSignup: awsCognitoSignupReducer,
  routing: routerReducer
});
