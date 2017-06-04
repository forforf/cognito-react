import * as ActionTypes from 'Actions/ActionTypes';
import InitialState from 'InitialState/InitialStateIndex';


const awsUserConfigReducer =  (state = InitialState.awsUserConfig, action) => {
  let newState = Object.assign({},  state);
  switch (action.type) {

    case ActionTypes.AWSUSERCONFIG_LOADED:
      return action.awsUserConfig;
      break; // eslint-disable-line no-unreachable

    default:
      return newState;
  }
};

export default awsUserConfigReducer;
