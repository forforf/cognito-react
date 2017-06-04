import expect, { createSpy, spyOn, isSpy } from 'expect'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable';
import {signInEpic, signUpRequestEpic, confirmUserEpic} from 'Epics/AwsCognitoEpics';
import {didCognitoSignIn} from 'Actions/ActionIndex';

//ToDo: Update these with Spy for AwsCognito
describe('confirmUserEpic', () => {

  // triggering action
  const action$ = ActionsObservable.of( {type: 'COGNITO_CONFIRM_REQUEST', payload: {} } );

  it('dispatches the correct actions (including side-effects) on success', (done) => {

    // payload of resulting action
    const actionPayload = 'foo';

    // resulting action observable
    const injectedDependency = () => ActionsObservable.of({actionPayload});

    //on success, we should get the success action from the action creator
    const expectedSuccessActions = [{type: 'COGNITO_CONFIRM_SUCCESS'}];

    confirmUserEpic(action$, null, {cognitoConfirm: injectedDependency})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions).toEqual(expectedSuccessActions);
              done();
            }
        );
  });

  it('dispatches the correct actions when there is an error', (done) => {

    // Create error
    const cognitoConfirm = () => Observable.throw('Expected error, thrown from test');

    //Note: In a more robust app, we'd have several action responses
    const expectedFailActions = {
      type: 'COGNITO_CONFIRM_FAIL',
      payload: 'just check if its a string',
      error: true // not checking this as it may change
    };

    confirmUserEpic(action$, null, {cognitoConfirm})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions.length).toEqual(1);
              expect(actualOutputActions[0].type).toEqual(expectedFailActions.type);
              expect(typeof actualOutputActions[0].payload).toBe('string');
              done();
            }
        );
  });
});

describe('signInEpic', () => {

  // triggering action
  const action$ = ActionsObservable.of( {type: 'COGNITO_SIGNIN_REQUEST', payload: {} } );

  it('dispatches the correct actions (including side-effects) on success', (done) => {

    // payload of resulting action
    const actionPayload = 'foo';

    // resulting action observable
    const injectedDependency = () => ActionsObservable.of({actionPayload});

    //on success, we should get the success action from the action creator
    const expectedSuccessActions = [didCognitoSignIn({actionPayload})];

    // cognitoSignIn: signInUser,
    signInEpic(action$, null, {cognitoSignIn: injectedDependency})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions).toEqual(expectedSuccessActions);
              done();
            }
        );
  });

  it('dispatches the correct actions when there is an error', (done) => {

    // Create error
    const cognitoSignIn = () => Observable.throw('Expected error, thrown from test');

    //Note: In a more robust app, we'd have several action responses
    const expectedFailActions = {
        type: 'COGNITO_SIGNIN_FAIL',
        payload: 'just check if its a string',
        error: true // not checking this as it may change
      };

    signInEpic(action$, null, {cognitoSignIn})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions.length).toEqual(1);
              expect(actualOutputActions[0].type).toEqual(expectedFailActions.type);
              expect(typeof actualOutputActions[0].payload).toBe('string');
              done();
            }
        );
  });
});

describe('signUpRequestEpic', () => {
  // triggering action
  const action$ = ActionsObservable.of( {type: 'COGNITO_SIGNUP_REQUEST', payload: {} } );

  it('dispatches the correct actions (including side-effects) on success', (done) => {

    // payload of resulting action
    const actionPayload = 'foo';

    // resulting action observable
    const injectedDependency = () => ActionsObservable.of({actionPayload});

    //on success, we should get the success action from the action creator
    const expectedSuccessActions = [{type: 'COGNITO_SIGNUP_SUCCESS'}];

    signUpRequestEpic(action$, null, {cognitoRegister: injectedDependency})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions).toEqual(expectedSuccessActions);
              done();
            }
        );
  });

  it('dispatches the correct actions when there is an error', (done) => {

    // Create error
    const cognitoRegister = () => Observable.throw('Expected error, thrown from test');

    //Note: In a more robust app, we'd have several action responses
    const expectedFailActions = {
      type: 'COGNITO_SIGNUP_FAIL',
      payload: 'just check if its a string',
      error: true // not checking this as it may change
    };

    signUpRequestEpic(action$, null, {cognitoRegister})
        .toArray()
        .subscribe(actualOutputActions => {
              expect(actualOutputActions.length).toEqual(1);
              expect(actualOutputActions[0].type).toEqual(expectedFailActions.type);
              expect(typeof actualOutputActions[0].payload).toBe('string');
              done();
            }
        );
  });
});

