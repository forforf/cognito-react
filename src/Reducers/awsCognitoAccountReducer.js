import * as ActionTypes from 'Actions/ActionTypes';
import InitialState from 'InitialState/InitialStateIndex';
import RequestStatus from 'SideEffects/RequestStatus';

// Sets Cognito status and returns API
const awsCognitoAccountReducer = (state, action) => {
  let newState = Object.assign({}, InitialState.awsCognitoAccount, state);
  switch (action.type) {

    case ActionTypes.COGNITO_SIGNIN_REQUEST:
      newState.signinStatus = RequestStatus.Request.PENDING;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNIN_SUCCESS:
      newState.signinStatus = RequestStatus.Request.SUCCESS;
      newState.awsApi = action.awsApi;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNIN_FAIL:
      newState.signinStatus = RequestStatus.Request.FAIL;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNUP_REQUEST:
      newState.signupStatus = RequestStatus.Request.PENDING;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNUP_SUCCESS:
      newState.signupStatus = RequestStatus.Request.SUCCESS;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_SIGNUP_FAIL:
      newState.signupStatus = RequestStatus.Request.FAIL;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_CONFIRM_REQUEST:
      newState.confirmStatus = RequestStatus.Request.PENDING;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_CONFIRM_SUCCESS:
      newState.confirmStatus = RequestStatus.Request.SUCCESS;
      return newState;
      break; // eslint-disable-line no-unreachable

    case ActionTypes.COGNITO_CONFIRM_FAIL:
      newState.confirmStatus = RequestStatus.Request.FAIL;
      return newState;
      break; // eslint-disable-line no-unreachable

    default:
      return newState;
  }
};

export default awsCognitoAccountReducer;