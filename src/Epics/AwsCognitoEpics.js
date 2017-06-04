import 'rxjs';
import { Observable } from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import * as ActionTypes from 'Actions/ActionTypes'
import { didCognitoSignIn } from 'Actions/ActionIndex';


// dependency injections allows us to mock side effect functions in testing
// DIs are defined in app/ConfigureStore.js
// and are the third argument in the Epic function

//third arg is DI, defined in app/configureStore
export const confirmUserEpic = (action$, store, {cognitoConfirm}) => {
  return (
      action$.ofType(ActionTypes.COGNITO_CONFIRM_REQUEST)
          .switchMap((awsState) => {
            return (
                cognitoConfirm(awsState)
                    .mapTo({type: ActionTypes.COGNITO_CONFIRM_SUCCESS})
                    .catch(error => Observable.of({
                      type: ActionTypes.COGNITO_CONFIRM_FAIL,
                      payload: error,
                      error: true
                    }))
            )
          })
  )
};


//third arg is DI, defined in app/configureStore
export const signInEpic = (action$, store, {cognitoSignIn}) => {
  return (
      action$.ofType(ActionTypes.COGNITO_SIGNIN_REQUEST)
          .switchMap((action) => {
            return (
                cognitoSignIn(action)
                    .map( (awsApi) => {
                      return didCognitoSignIn(awsApi)
                    } )
                    .catch(error => {
                      console.error('AwsCognitoEpic Error', error);
                      return Observable.of({
                        type: ActionTypes.COGNITO_SIGNIN_FAIL,
                        payload: error,
                        error: true
                      })
                    })
            )
          })
  )
};

//third arg is DI, defined in app/configureStore
export const signUpRequestEpic = (action$, store, {cognitoRegister}) => {
  return (
      action$.ofType(ActionTypes.COGNITO_SIGNUP_REQUEST)
          .switchMap((signupData) => {
            return (
                cognitoRegister(signupData)
                    .mapTo({type: ActionTypes.COGNITO_SIGNUP_SUCCESS})
                    .catch(error => Observable.of({
                      type: ActionTypes.COGNITO_SIGNUP_FAIL,
                      payload: error,
                      error: true
                    }))
            )
          })
  )
};


const sideEffectEpics  =  (...args) => combineEpics(
    confirmUserEpic,
    signInEpic,
    signUpRequestEpic
)(...args);
// See app/configStore for args to rootEpic (Dependency Injections)

export default sideEffectEpics;
