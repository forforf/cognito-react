import expect, { createSpy, spyOn, isSpy } from 'expect'
import {tryCognitoRegister} from 'Actions/ActionIndex';
import awsCognitoSignupReducer from 'Reducers/awsCognitoSignupReducer';
import InitialState from 'InitialState/InitialStateIndex';


describe('awsCognitoSignupReducer reducer', () => {
  const reducer = awsCognitoSignupReducer;
  let initialState = {};

  beforeEach(() => {
    initialState = Object.assign({}, InitialState.awsCognitoSignup);
  });

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
  });

  it('provides update messages on request', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Creating Account ..."];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    expect(
        reducer({}, tryCognitoRegister({}))
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, tryCognitoRegister({}))
    ).toEqual(expectedState);
  });

  it('provides update messages on success', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Account Created"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let successAction = {type: 'COGNITO_SIGNUP_SUCCESS'};

    expect(
        reducer({}, successAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, successAction)
    ).toEqual(expectedState);
  });

  it('provides update messages on failure', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Failed to create account"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let failAction = {type: 'COGNITO_SIGNUP_FAIL'};
    expect(
        reducer({}, failAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, failAction)
    ).toEqual(expectedState);
  });
});
