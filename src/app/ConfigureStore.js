import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from 'Epics/EpicIndex';
import rootReducer from 'Reducers/ReducerIndex';

// Side Effects
import {registerUser, confirmUser, signInUser} from 'SideEffects/AwsCognito';
import Persist from 'SideEffects/Persist';



const epicMiddleware = createEpicMiddleware(rootEpic,
    // I'm not sure if this is a best practice or not
    // but this is where all side effects get injected
    // into epics. Mainly to allow for testing
    // My personal preference is to keep the dependencies flat
    // But that's mainly because I've not found a nice way to inject
    // deeply nested dependencies.
    // Usage in Epics:
    //   SomeEpic(action$, state, {dependencySideEffect})
    // where {dependencySideEffect} is a property of
    // the dependencies, and the sideEffect function is the value
    {
      dependencies: {
        cognitoSignIn: signInUser,
        cognitoConfirm: confirmUser,
        cognitoRegister: registerUser,
        persistLoad: Persist.load,
        persistSave: Persist.save
      }
    });

const createStoreWithMiddleware = applyMiddleware(
    epicMiddleware
)(createStore);


export default function ConfigureStore() {

  const store = createStoreWithMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
