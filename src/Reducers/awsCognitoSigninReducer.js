import * as ActionTypes from 'Actions/ActionTypes';
import InitialState from 'InitialState/InitialStateIndex';

const awsCognitoSigninReducer = (state = InitialState.awsCognitoSignin, action) => {
  let newState = Object.assign({}, state);
  let messages = newState.messages || [];

  switch (action.type) {

    case ActionTypes.COGNITO_SIGNIN_REQUEST:
      newState.messages = [...messages, "Signing in ..."];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNIN_SUCCESS:
      newState.messages = [...messages, "Signed in"];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNIN_FAIL:
      newState.messages = [...messages, "Sign in failed"];
      return newState;
      break; // eslint-disable-line no-unreachable

    default:
      return newState;
  }
};

export default awsCognitoSigninReducer;
