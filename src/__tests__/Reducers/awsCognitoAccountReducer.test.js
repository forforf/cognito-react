import expect, { createSpy, spyOn, isSpy } from 'expect'
import awsCognitoAccountReducer from 'Reducers/awsCognitoAccountReducer';
import InitialState from 'InitialState/InitialStateIndex';
import RequestStatus from 'SideEffects/RequestStatus';
import {
  tryCognitoSignIn,
  didCognitoSignIn,
  tryCognitoRegister,
  tryConfirmCognitoUser } from 'Actions/ActionIndex';


describe('awsCognitoAccountReducer reducer', () => {
  const reducer = awsCognitoAccountReducer;
  let initialState = {};

  beforeEach(() => {
    initialState = Object.assign({}, InitialState.awsCognitoAccount);
  });

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
  });

  describe('Sign In', () => {

    it('updates request status', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.signinStatus = RequestStatus.Request.PENDING;

      expect(
          reducer({}, tryCognitoSignIn({awsState: {}}) )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, tryCognitoSignIn({awsState: {}}))
      ).toEqual(expectedState);
    });

    it('updates status on success', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.awsApi = 'myApi';
      expectedState.signinStatus = RequestStatus.Request.SUCCESS;

      expect(
          reducer({}, didCognitoSignIn('myApi'))
      ).toEqual(expectedState);

      expect(
          reducer(initialState, didCognitoSignIn('myApi'))
      ).toEqual(expectedState);
    });

    it('updates status on failure', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.signinStatus = RequestStatus.Request.FAIL;

      let failAction = {
        type: 'COGNITO_SIGNIN_FAIL',
        payload: {},
        error: true
      };

      expect(
          reducer({}, failAction )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, failAction)
      ).toEqual(expectedState);
    });
  });

  describe('Register', () => {
    it('updates request status', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.signupStatus = RequestStatus.Request.PENDING;

      expect(
          reducer({}, tryCognitoRegister({awsState: {}}) )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, tryCognitoRegister({awsState: {}}))
      ).toEqual(expectedState);
    });

    it('updates status on success', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.signupStatus = RequestStatus.Request.SUCCESS;

      const registerAction = {
        type: 'COGNITO_SIGNUP_SUCCESS'
      };

      expect(
          reducer({}, registerAction)
      ).toEqual(expectedState);

      expect(
          reducer(initialState, registerAction)
      ).toEqual(expectedState);
    });

    it('updates status on failure', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.signupStatus = RequestStatus.Request.FAIL;

      let failAction = {
        type: 'COGNITO_SIGNUP_FAIL',
        payload: {},
        error: true
      };

      expect(
          reducer({}, failAction )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, failAction)
      ).toEqual(expectedState);
    });
  });

  describe('Confirm', () => {
    it('updates request status', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.confirmStatus = RequestStatus.Request.PENDING;

      expect(
          reducer({}, tryConfirmCognitoUser({confirmData: 'Confirmation Data'}) )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, tryConfirmCognitoUser({confirmData: 'Confirmation Data'}))
      ).toEqual(expectedState);
    });

    it('updates status on success', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.confirmStatus = RequestStatus.Request.SUCCESS;

      const confirmAction = {
        type: 'COGNITO_CONFIRM_SUCCESS'
      };

      expect(
          reducer({}, confirmAction)
      ).toEqual(expectedState);

      expect(
          reducer(initialState, confirmAction)
      ).toEqual(expectedState);
    });

    it('updates status on failure', () => {
      let expectedState = Object.assign({}, initialState);
      expectedState.confirmStatus = RequestStatus.Request.FAIL;

      let failAction = {
        type: 'COGNITO_CONFIRM_FAIL',
        payload: {},
        error: true
      };

      expect(
          reducer({}, failAction )
      ).toEqual(expectedState);

      expect(
          reducer(initialState, failAction)
      ).toEqual(expectedState);
    });
  });


});
