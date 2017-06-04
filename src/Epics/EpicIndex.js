import {combineEpics} from 'redux-observable';
import AwsCognitoEpics from './AwsCognitoEpics';
import PersistEpics from './PersistEpics';

const rootEpic  =  (...args) => combineEpics(
    AwsCognitoEpics,
    PersistEpics
)(...args);
// See app/configStore for args to rootEpic (Dependency Injections)

export default rootEpic;
