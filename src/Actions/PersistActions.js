import * as ActionTypes from 'Actions/ActionTypes';

// Use payload as key rather than savedState?
export function loadedPersistedData(payload) {
  return {
    type: ActionTypes.PERSIST_LOAD_SUCCESS,
    savedState: payload
  }
}

export function trySavePersistedData(stateKey, value) {
  return {
    type: ActionTypes.PERSIST_SAVE_REQUEST,
    stateKey,
    value
  }
}
export function didSavePersistedData(payload) {
  return {
    type: ActionTypes.PERSIST_SAVE_SUCCESS,
    savedState: payload
  }
}
