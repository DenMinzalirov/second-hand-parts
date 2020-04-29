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

// export const getAllUsers = () => {
//   return dispatch => {
//     dispatch({
//       type: GET_ALL_USERS_REQUEST,
//     })
//     firebase
//       .database()
//       .ref('users')
//       .once('value')
//       .then(snapshot => {
//         dispatch({
//           type: GET_ALL_USERS_SUCCESS,
//           payload: snapshot.val(),
//         })
//       })
//   }
// }

// export const getUserOwner = ownerId => {
//   return dispatch => {
//     dispatch({
//       type: GET_USER_OWNER_REQUEST,
//     })
//     firebase
//       .database()
//       .ref('users')
//       .child(ownerId)
//       .once('value')
//       .then(snapshot => {
//         dispatch({
//           type: GET_USER_OWNER_SUCCESS,
//           payload: snapshot.val().phone,
//         })
//         console.log(snapshot.val().phone)
//       })
//   }
// }

export const getMyBase = (ownerId) => {
  return dispatch => {
    dispatch({
      type: GET_MY_BASE_REQUEST,
    })
    firebase
      .database()
      .ref('orders')
      .once('value')
      .then(snapshot => {
        dispatch({
          type: GET_MY_BASE_SUCCESS,
          payload: Object.entries(snapshot.val()).map(entry => ({
            [entry[0]]: entry[1],
          })).filter((item) => {
            return item[Object.keys(item)[0]].ownerId === ownerId
          }),
        })
      })
      .catch(e => {
        console.log('GET_MY_BASE_UNSUCCESS', e)
        dispatch({
          type: GET_MY_BASE_UNSUCCESS,
          payload: e,
        })
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
          payload: Object.entries(snapshot.val()).map(entry => ({
            [entry[0]]: entry[1],
          })),
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
