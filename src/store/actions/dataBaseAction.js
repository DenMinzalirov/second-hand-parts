import firebase from '../../firebase/firebase'

export const GET_BASE_REQUEST = 'GET_BASE_REQUEST'
export const GET_BASE_SUCCESS = 'GET_BASE_SUCCESS'
export const GET_BASE_UNSUCCESS = 'GET_BASE_UNSUCCESS'
export const GET_USER_OWNER_REQUEST = 'GET_USER_OWNER_REQUEST'
export const GET_USER_OWNER_SUCCESS = 'GET_USER_OWNER_SUCCESS'
export const GET_USER_OWNER_UNSUCCESS = 'GET_USER_OWNER_UNSUCCESS'
export const GET_ALL_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_ALL_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_ALL_USERS_UNSUCCESS = 'GET_USERS_UNSUCCESS'
export const DEL_ITEM = 'DEL_ITEM'
export const GET_MY_BASE_REQUEST = 'GET_MY_BASE_REQUEST'
export const GET_MY_BASE_SUCCESS = 'GET_MY_BASE_SUCCESS'
export const GET_MY_BASE_UNSUCCESS = 'GET_MY_BASE_UNSUCCESS'
export const CLEAR_BASE = 'CLEAR_BASE'

export const delItem = (itemId) => {
  return dispatch => {
    dispatch({
      type: DEL_ITEM
    })
    firebase
      .database()
      .ref('orders/' + itemId)
      .remove().then((e) => {
        console.log('DEL_ITEM', e)
      })
  }
}

export const clearBase = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_BASE,
    })
  }
}

export const getBase = () => {
  return dispatch => {
    dispatch({
      type: GET_BASE_REQUEST,
    })
    firebase
      .database()
      .ref('orders')
      .once('value')
      .then(snapshot => {
        dispatch({
          type: GET_BASE_SUCCESS,
          payload: Object.entries(snapshot.val()).map((ent) => {
            ent[1].id = ent[0]
            return ent[1]
          }).reverse(),
        })
      })
      .catch(e => {
        console.log('GET_BASE_UNSUCCESS', e)
        dispatch({
          type: GET_BASE_UNSUCCESS,
          payload: e,
        })
      })
  }
}
