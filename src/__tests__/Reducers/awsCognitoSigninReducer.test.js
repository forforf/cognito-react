import expect, { createSpy, spyOn, isSpy } from 'expect'
import {tryCognitoSignIn, didCognitoSignIn} from 'Actions/ActionIndex';
import awsCognitoSigninReducer from 'Reducers/awsCognitoSigninReducer';
import InitialState from 'InitialState/InitialStateIndex';


describe('awsCognitoSigninReducer reducer', () => {
  const reducer = awsCognitoSigninReducer;
  let initialState = {};

  beforeEach(() => {
    initialState = Object.assign({}, InitialState.awsCognitoSignin);
  });

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
  });

  it('provides update messages on request', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Signing in ..."];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    expect(
        reducer({}, tryCognitoSignIn({}))
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, tryCognitoSignIn({}))
    ).toEqual(expectedState);
  });

  it('provides update messages on success', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Signed in"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    expect(
        reducer({}, didCognitoSignIn({}))
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, didCognitoSignIn({}))
    ).toEqual(expectedState);
  });

  it('provides update messages on failure', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Sign in failed"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let failAction = {type: 'COGNITO_SIGNIN_FAIL'};
    expect(
        reducer({}, failAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, failAction)
    ).toEqual(expectedState);
  });
});
