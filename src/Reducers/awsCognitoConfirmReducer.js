import * as ActionTypes from 'Actions/ActionTypes';
import InitialState from 'InitialState/InitialStateIndex';

const awsCognitoConfirmReducer = (state = InitialState.awsCognitoConfirm, action) => {
  const newState = Object.assign({}, state);
  const messages = newState.messages || [];

  switch (action.type) {

    case ActionTypes.COGNITO_CONFIRM_REQUEST:
      newState.messages = [...messages, "Confirming Account ..."];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_CONFIRM_SUCCESS:
      newState.messages = [...messages, "Account confirmed"];
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_CONFIRM_FAIL:
      console.error('Cognito Confirmation Error', action.payload);
      newState.messages = [...messages, "Failed to confirm account"];
      return newState;
      break; // eslint-disable-line no-unreachable

    default:
      return newState;
  }
};

export default awsCognitoConfirmReducer;
