import * as ActionTypes from 'Actions/ActionTypes';

export function tryCognitoSignIn(payload) {
  return {
    type: ActionTypes.COGNITO_SIGNIN_REQUEST,
    cognitoRequest: payload.cognitoRequest,
    messages: payload.messages
  }
}

export function didCognitoSignIn(payload) {
  return {
    type: ActionTypes.COGNITO_SIGNIN_SUCCESS,
    awsApi: payload
  }
}

export function tryCognitoRegister(payload) {
  return {
    type: ActionTypes.COGNITO_SIGNUP_REQUEST,
    signupData: payload.signupData
  }
}

export function tryConfirmCognitoUser(payload) {

  return {
    type: ActionTypes.COGNITO_CONFIRM_REQUEST,
    awsState: payload.confirmData
  }
}