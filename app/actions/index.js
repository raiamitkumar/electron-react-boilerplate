// Actions are payloads of informations that are used to modify the
// application's Redux state. They may also act as signals and information
// payloads to sagas when asynchronous operations need to occur. This app uses
// [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) to
// make sure actions have a uniform schema.
//
// http://redux.js.org/docs/basics/Actions.html
import { createAction } from 'redux-actions';
import { camelCase, upperSnakeCase } from '../utils';

// The action type names for this app's Redux/Flux actions. Used to generate
// `ActionTypes` and `Actions` used throughout the app.
// actionName -> ActionType ('action name' -> 'ACTION_NAME')
// actionName -> ActionCreator ('action name' -> 'actionName')
let actionNames = normalize(
  // Data load resource actions
  ...loadAll(
    'data'
  ),
);

// Create multiple load action types (get, loading and loading)
function loadAll (...names) {
  return [].concat(...names.map(load));
}

// Create load action type variants with get, loading and loading prefixed
function load (resourceName) {
  return [
    `get ${resourceName}`,
    `loading ${resourceName}`,
    `loaded ${resourceName}`,
  ];
}

// Uper snake case names
function normalize (...names) {
  return names.map(upperSnakeCase);
}

// The app's redux action types. Each key is the same as the string action type.
// For each action name, the type is generated by upper snake-casing the phrase.
// assert.equal(ActionTypes.EAT_CAKE, 'EAT_CAKE');
export const ActionTypes = actionNames.reduce((actionTypes, actionName) => {
  actionTypes[actionName] = actionName;
  return actionTypes;
}, {});

// Action creators for the app (functions that return Redux/Flux actions).
// let action = Actions.wingardiumLeviosa('ferret');
// assert.deepEqual(action, { type: 'WINGARDIUM_LEVIOSA', payload: 'ferret' });
export const Actions = actionNames.reduce((actions, actionName) => {
  let actionCreatorName = camelCase(actionName);
  actions[actionCreatorName] = createAction(actionName, x => x, (x, y) => y);
  return actions;
}, {});
