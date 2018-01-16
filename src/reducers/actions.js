/*
setListItems
submitListItem
*/
import axios from 'axios';
import { submit } from 'redux-form';

export const listItemActions = {
  SET_LISTITEMS: 'SET_LISTITEMS',
  POST_LISTITEM: 'POST_LISTITEM',
  FETCH_LISTITEMS: 'FETCH_LISTITEMS',
};

export function requestListItems() {
  return { type: listItemActions.FETCH_LISTITEMS };
}

export function fetchListItems() {
  return function(dispatch) {
    dispatch(requestListItems());
    return axios.get('items')
      .then((resp) => {
        console.log("response received", resp)
        dispatch(receiveListItems(resp));
      })
      .catch((err) => {
        console.log("an error occured", err)
      });
  };
}

export function receiveListItems(response) {
  return {
    type: listItemActions.FETCH_LISTITEMS,
    status: response.status,
    listItems: response.data
  };
}

export function setListItems(items) {
  return { type: listItemActions.SET_LISTITEMS, items };
}

export function submitListItem(added) {
  return { type: listItemActions.POST_LISTITEM, added };
}

export function confirmAddListItem(resp) {
  return {
    type: listItemActions.POST_LISTITEM,
    status: resp.status,
    responseItem: resp.data
  };
}

export function postListItem(values) {
  var added = {
    status: "backlog",
    message: values.todoField
  };
  return function (dispatch) {
    dispatch(submitListItem(added));
    return axios.post('items', added)
      .then((resp) => {
        console.log("response received", resp)
          dispatch(confirmAddListItem(resp));
      })
      .catch((err) => {
        console.log("an error occured", err)
      });
  }
}
