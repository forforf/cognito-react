import * as ActionTypes from 'Actions/ActionTypes';
import InitialState from 'InitialState/InitialStateIndex';

const awsCognitoSignupReducer = (state = InitialState.awsCognitoSignup, action) => {
  const newState = Object.assign({}, state);
  const messages = newState.messages || [];

  switch (action.type) {

    case ActionTypes.COGNITO_SIGNUP_REQUEST:
      newState.messages = [...messages, "Creating Account ..."];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNUP_SUCCESS:
      newState.messages = [...messages, "Account Created"];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNUP_FAIL:
      newState.messages = [...messages, "Failed to create account"];
      return newState;
      break; // eslint-disable-line no-unreachable

    default:
      return newState;
  }
};

export default awsCognitoSignupReducer;
