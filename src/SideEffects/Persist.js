import Rx from "rxjs/Rx";
import LocalStorage from "./LocalStorageShim"
import _set from 'lodash/set';


const STORAGE_KEY="react-cognito";

export const saveCallback = (action, callback) => {
  try {
    // load if it already exists
    const serializedState = LocalStorage.getItem(STORAGE_KEY);
    let persistObj = Object.assign({}, JSON.parse(serializedState));
    _set(persistObj, action.stateKey, action.value);

    const serializedObj = JSON.stringify(persistObj);
    LocalStorage.setItem(STORAGE_KEY, serializedObj);
    callback(null, persistObj);
  } catch(err)  {
    console.error("Unable to save to localStorage", err);
    callback(err);
  }
};


const loadCallback = (action, callback ) => {
  try {
    const serializedState = LocalStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      console.warn("No localstorage found for: ", STORAGE_KEY);
      callback(null, undefined);
    }
    let persistObj = JSON.parse(serializedState);
    callback(null, persistObj);
  } catch(err)  {
    console.error("Unable to load from localStorage", err);
    callback(err);
  }
};

export default {
  load: Rx.Observable.bindNodeCallback(loadCallback),
  save: Rx.Observable.bindNodeCallback(saveCallback)
}