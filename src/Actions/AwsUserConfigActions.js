import * as ActionTypes from 'Actions/ActionTypes';

export function setAwsUserConfig(config) {
  return {
    type: ActionTypes.AWSUSERCONFIG_CHANGING,
    stateKey: 'awsUserConfig',
    value: config
  }
}

export function loadedAwsUserConfig(loadedState){
  return {
    type: ActionTypes.AWSUSERCONFIG_LOADED,
    awsUserConfig: loadedState.awsUserConfig
  }
}
