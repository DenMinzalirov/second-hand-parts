import firebase from '../../firebase/firebase'

export const SET_USER_REQUEST = 'SET_USER_REQUEST'
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_UNSUCCESS = 'SET_USER_UNSUCCESS'
export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST'
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS'
export const CHECK_USER_UNSUCCESS = 'CHECK_USER_UNSUCCESS'
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_UNSUCCESS = 'CREATE_USER_UNSUCCESS'
export const LOG_OUT_USER = 'LOG_OUT_USER'

export const createUser = ({ email, password, displayName, phone }) => {
  return dispatch => {
    dispatch({
      type: CREATE_USER_REQUEST,
    })
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user
          .updateProfile({
            displayName,
          })
          .then(() => {
            firebase
              .database()
              .ref('users')
              .child(user.user.uid)
              .set({
                email,
                password,
                displayName,
                phone,
                ownerID: user.user.uid,
              })
          })
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: { user, phone, displayName },
        })
      })
      .catch(e => {
        dispatch({
          type: CREATE_USER_UNSUCCESS,
          payload: e.message,
        })
      })
  }
}

export const setUser = ({ user, password }) => {
  return dispatch => {
    dispatch({
      type: SET_USER_REQUEST,
    })
    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .then(status => {
        // console.log('signInWithEmailAndPassword', resp)
        dispatch({
          type: SET_USER_SUCCESS,
          payload: status.user,
        })
      })
      .catch(e => {
        dispatch({
          type: SET_USER_UNSUCCESS,
          payload: e.message,
        })
      })
  }
}

export const checkAuthStateChanged = () => {
  return dispatch => {
    dispatch({
      type: CHECK_USER_REQUEST,
    })
    firebase.auth().onAuthStateChanged(status => {
      // console.log('loggedIn', status)
      if (status) {
        firebase
          .database()
          .ref('users')
          .child(status.uid)
          .once('value')
          .then(snapshot => {
            dispatch({
              type: CHECK_USER_SUCCESS,
              payload: snapshot.val(),
            })
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

export const logOutUser = () => {
  return dispatch => {
    dispatch({
      type: LOG_OUT_USER,
    })
    firebase.auth().signOut()
  }
}
