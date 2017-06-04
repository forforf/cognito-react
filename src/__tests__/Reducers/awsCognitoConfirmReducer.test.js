import expect, { createSpy, spyOn, isSpy } from 'expect'
import awsCognitoConfirmReducer from 'Reducers/awsCognitoConfirmReducer';
import InitialState from 'InitialState/InitialStateIndex';


describe('awsCognitoConfirmReducer reducer', () => {
  const reducer = awsCognitoConfirmReducer;
  let initialState = {};

  beforeEach(() => {
    initialState = Object.assign({}, InitialState.awsCognitoConfirm);
  });

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
  });

  it('provides update messages on request', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Confirming Account ..."];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let requestAction = {type: 'COGNITO_CONFIRM_REQUEST'};

    expect(
        reducer({}, requestAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, requestAction)
    ).toEqual(expectedState);
  });

  it('provides update messages on success', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Account confirmed"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let successAction = {type: 'COGNITO_CONFIRM_SUCCESS'};

    expect(
        reducer({}, successAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, successAction)
    ).toEqual(expectedState);
  });

  it('provides update messages on failure', () => {
    let startState = Object.assign({}, initialState);
    let newMessages = ["Failed to confirm account"];
    let expectedState = Object.assign({}, {messages: [...startState.messages, ...newMessages]});

    let failAction = {type: 'COGNITO_CONFIRM_FAIL'};
    expect(
        reducer({}, failAction)
    ).toEqual({messages: newMessages});

    expect(
        reducer(startState, failAction)
    ).toEqual(expectedState);
  });
});
