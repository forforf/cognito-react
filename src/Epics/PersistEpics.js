import { Observable } from 'rxjs/Observable';
import {combineEpics} from 'redux-observable';
import * as ActionTypes from 'Actions/ActionTypes'
import { loadedAwsUserConfig,
         loadedPersistedData,
         trySavePersistedData,
         didSavePersistedData } from 'Actions/ActionIndex';


export const PersistLoadEpic = (action$, store, {persistLoad}) => {
  return (
      action$.ofType(ActionTypes.APP_INIT, ActionTypes.PERSIST_SAVE_SUCCESS)
          .switchMap((action) => {
            return (
                // persistLoad has the side effect of loading data from localStorage
                // and this is passed as the observable argument in the persistLoad stream
                persistLoad(action)
                    // emits stored object
                    .flatMap( (loadedData) => {
                      return [
                        loadedPersistedData(loadedData),
                        loadedAwsUserConfig(loadedData)
                      ];
                    } )

                    .catch(error => Observable.of({
                      type: ActionTypes.PERSIST_LOAD_FAIL,
                      payload: error,
                      error: true
                    }))
            )
          })
  )
};

export const PersistSaveEpic = (action$, store, {persistSave}) => {
  return (
      action$.ofType(ActionTypes.PERSIST_SAVE_REQUEST)
          .switchMap((action) => {
            let obs = persistSave(action);
            let actionHasKeyandValue = (action.hasOwnProperty('stateKey') && action.hasOwnProperty('value'));
            if (!obs || !actionHasKeyandValue) {
              return Observable.of(
                  {
                    type: ActionTypes.PERSIST_SAVE_SKIPPED,
                    payload: "Skipped because action does not exist or does not have saveKey or value props",
                    warn: true
                  }
              )
            }

            return (
                obs.map( (newAction) => {
                  return didSavePersistedData(newAction)
                } )
                  .catch(error => Observable.of({
                      type: ActionTypes.PERSIST_SAVE_FAIL,
                      payload: error,
                      error: true
                    }))
            )
          })
  )
};

// This Epic just maps "AWSUSERCONFIG_CHANGING" action to the save persisted data action
export const PersistAwsConfigEpic = (action$) => {
  return (
      action$.ofType(ActionTypes.AWSUSERCONFIG_CHANGING)
          .switchMap((action) => {
            return (Observable.of(trySavePersistedData(action.stateKey, action.value)) );
          })
  )
};

const PersistEpics  =  (...args) => combineEpics(
    PersistLoadEpic,
    PersistSaveEpic,
    PersistAwsConfigEpic
)(...args);
// See app/configStore for args to rootEpic (Dependency Injections)

export default PersistEpics;