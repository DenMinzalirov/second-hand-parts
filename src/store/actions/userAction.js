import firebase from '../../firebase/firebase'

export const SET_USER_REQUEST = 'SET_USER_REQUEST'
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_UNSUCCESS = 'SET_USER_UNSUCCESS'
export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST'
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS'
export const CHECK_USER_UNSUCCESS = 'CHECK_USER_UNSUCCESS'

export const setUser = ({ user, password }) => {
  return dispatch => {
    dispatch({
      type: SET_USER_REQUEST,
    })
    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(resp => {
        console.log('signInWithEmailAndPassword', resp)
        dispatch({
          type: SET_USER_SUCCESS,
          payload: user,
        })
      })
      .catch(e => {
        dispatch({
          type: SET_USER_UNSUCCESS,
          payload: e.message,
        })
        console.log('err', e)
      })
  }
}

export const checkAuthStateChanged = () => {
  return dispatch => {
    dispatch({
      type: CHECK_USER_REQUEST,
    })
    firebase.auth().onAuthStateChanged(status => {
      console.log('loggedIn', status)
      if (status) {
        dispatch({
          type: CHECK_USER_SUCCESS,
          payload: status,
        })
      } else {
        dispatch({
          type: CHECK_USER_UNSUCCESS,
          // payload: user,
        })
      }
    })
  }
}
