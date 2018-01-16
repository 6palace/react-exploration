import { listItemActions } from './actions';
import { combineReducers } from 'redux';
import { reducer as formReducer  } from 'redux-form';
/*
listItems: array
form: form for adding listitem
postStatus: form ajax status
routing
*/
const listItems = (state=[], action) => {
  switch(action.type) {
  case listItemActions.SET_LISTITEMS:
    return action.items;
  case listItemActions.FETCH_LISTITEMS:
    if (action.status) {
      return action.listItems;
    } else {
      return state;
    }
  case listItemActions.POST_LISTITEM:
    if (action.status) {
        return state;
      //if status is created, verify listitems contains result then return state or throw err
      //if err, refetch listItems <- move to action
    } else {
      return [...state, action.added];
    }
  default:
    return state;
  }
};

const fetchAjax = (state={inProgress: false}, action) => {
  switch(action.type) {
  case listItemActions.FETCH_LISTITEMS:
    return {
      inProgress: action.status ? false : true
    };
  default:
    return state;
  }
};

const postAjax = (state = { inProgress: false }, action) => {
  switch (action.type) {
    case listItemActions.POST_LISTITEM:
      return {
        inProgress: action.status ? false : true
      };
    default:
      return state;
  }
};

export default combineReducers({
  listItems,
  fetchAjax,
  postAjax,
  form: formReducer
});
