import expect, { createSpy, spyOn, isSpy } from 'expect'
import {loadedAwsUserConfig} from 'Actions/ActionIndex';
import awsUserConfigReducer from 'Reducers/awsUserConfigReducer';
import InitialState from 'InitialState/InitialStateIndex';

//loadedAwsUserConfig(loadedState)
describe('awsUserConfig reducer', () => {
  const reducer = awsUserConfigReducer;
  let expectedState = {};

  beforeEach(() => {
    expectedState = Object.assign({}, InitialState.awsUserConfig);
  });

  it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(expectedState)
  });

  it('updates state with loaded data', () => {
    let fakeUserConfig = {awsUserConfig: {awsConfig: 'fake'}};

    expect(
        reducer({}, loadedAwsUserConfig(fakeUserConfig))
    ).toEqual(fakeUserConfig.awsUserConfig);

    expect(
        reducer(InitialState, loadedAwsUserConfig(fakeUserConfig))
    ).toEqual(fakeUserConfig.awsUserConfig);
  });

});
//
//   it('should handle setAwsEmail', () => {
//     let previousUserState = Object.assign({}, expectedState);
//     previousUserState.email = 'uvw@xyz.edu';
//     expectedState.email = 'abc@def.com';
//
//     expect(
//         reducer({}, setAwsEmail({email: 'abc@def.com'}) )
//     ).toEqual(expectedState);
//
//     expect(
//         reducer(previousUserState, setAwsEmail({email: 'abc@def.com'}))
//     ).toEqual(expectedState);
//   });
//
//   it('should handle setAwsRegion', () => {
//     let previousUserState = Object.assign({}, expectedState);
//     previousUserState.region = 'us-west-2';
//     expectedState.region = 'us-east-1';
//
//     expect(
//         reducer({}, setAwsRegion({region: 'us-east-1'}) )
//     ).toEqual(expectedState);
//
//     expect(
//         reducer(previousUserState, setAwsRegion({region: 'us-east-1'}))
//     ).toEqual(expectedState);
//   });
//
//   it('should handle setAwsS3Bucket', () => {
//     let previousUserState = Object.assign({}, expectedState);
//     previousUserState.s3bucket = 'notThisOne';
//     expectedState.s3bucket = 'myBucketz';
//
//     expect(
//         reducer({}, setAwsS3Bucket({s3bucket: 'myBucketz'}) )
//     ).toEqual(expectedState);
//
//     expect(
//         reducer(previousUserState, setAwsS3Bucket({s3bucket: 'myBucketz'}))
//     ).toEqual(expectedState);
//   });
//
//   it('should handle setAwsUser', () => {
//     let previousUserState = Object.assign({}, expectedState);
//     previousUserState.user = 'MrBar';
//     expectedState.user = 'MrFoo';
//
//     expect(
//         reducer({}, setAwsUser({user: 'MrFoo'}) )
//     ).toEqual(expectedState);
//
//     expect(
//         reducer(previousUserState, setAwsUser({user: 'MrFoo'}) )
//     ).toEqual(expectedState);
//   });
//
//   describe('it should handle data from persistent storage', () => {
//     it('returns initial state if no persisted data found and no previous state existed', () => {
//
//       expect(
//           reducer({}, persistLoadSuccess(undefined))
//       ).toEqual(InitialState.awsUserConfig);
//
//       // expect(
//       //     reducer(previousUserState, setAwsUser({user: 'MrFoo'}) )
//       // ).toEqual(expectedState);
//     });
//
//     it('returns initial state if no persisted data found and no previous state existed', () => {
//       let previousUserState = Object.assign({}, expectedState);
//       previousUserState.user = 'MrBar';
//       let persistedData = Object.assign({}, expectedState);
//       previousUserState.user = 'MrBar';
//       _.set(persistedData, 'savedState.awsUserConfig.user', 'MrFoo');
//
//       expect(
//           reducer(previousUserState, persistLoadSuccess({undefined}))
//       ).toEqual(InitialState.awsUserConfig);
//
//       // expect(
//       //     reducer(previousUserState, setAwsUser({user: 'MrFoo'}) )
//       // ).toEqual(expectedState);
//     })
//
//     // it('returns initial state if no persisted data found', () => {
//     //
//     //   expect(
//     //       reducer({}, persistLoadSuccess(undefined))
//     //   ).toEqual(InitialState.awsUserConfig);
//     //
//     //   // expect(
//     //   //     reducer(previousUserState, setAwsUser({user: 'MrFoo'}) )
//     //   // ).toEqual(expectedState);
//     // })
//   });
//
// });
