// import expect, { createSpy, spyOn, isSpy } from 'expect'
// // import {signInRequest, signInSuccess} from 'Actions/ActionIndex';
// import persistReducer from 'Reducers/persistReducer';
// import InitialState from 'InitialState/InitialStateIndex';
//

describe('jest', () => {
  it('shut up', () => {
    expect(true).toBe(true);
  })
});

// describe('persistReducer reducer', () => {
//   const reducer = persistReducer;
//   let initialState = {};
//
//   beforeEach(() => {
//     initialState = Object.assign({}, "");
//   });
//
//   // If the action doesn't apply to this reducer, just return the same state
//   it('passes through when state is undefined ', () => {
//     let state = {myState: "ignore me"};
//     expect(
//         reducer(state, {})
//     ).toEqual(state)
//   });
//
//   // if state is undefined, most reducers would use that to set
//   // their initial state. However, in this case we want to leave
//   // the state undefined, so any other reducers will use their defaults
//   // since there was no data in the local store.
//   it('acts as a passthrough when no persited data exists', () => {
//     let expectedState = Object.assign({}, initialState);
//     //expectedState.foo = 'initial state';
//
//     // expect(
//     //     reducer({}, signInRequest({awsState: {}}) )
//     // ).toEqual(expectedState);
//     //
//     // expect(
//     //     reducer(initialState, signInRequest({awsState: {}}))
//     // ).toEqual(expectedState);
//   });
//
//   // it('should handle signInSuccess', () => {
//   //   let expectedState = Object.assign({}, initialState);
//   //   expectedState.signinStatus = RequestStatus.Request.SUCCESS;
//   //
//   //   expect(
//   //       reducer({}, signInSuccess({awsState: {}}) )
//   //   ).toEqual(expectedState);
//   //
//   //   expect(
//   //       reducer(initialState, signInSuccess({awsState: {}}))
//   //   ).toEqual(expectedState);
//   // });
//   //
//   // it('should handle signInFailure', () => {
//   //   let expectedState = Object.assign({}, initialState);
//   //   expectedState.signinStatus = RequestStatus.Request.FAIL;
//   //
//   //   let failAction = {
//   //     type: 'COGNITO_SIGNIN_FAIL',
//   //     payload: {},
//   //     error: true
//   //   };
//   //
//   //   expect(
//   //       reducer({}, failAction )
//   //   ).toEqual(expectedState);
//   //
//   //   expect(
//   //       reducer(initialState, failAction)
//   //   ).toEqual(expectedState);
//   // });
// });
