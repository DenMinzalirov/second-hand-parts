import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_UNSUCCESS,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  CHECK_USER_UNSUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_UNSUCCESS,
  LOG_OUT_USER,
} from '../actions/userAction'

const initialState = {
  displayName: '',
  // password: '',
  isFetching: false,
  isLoggedIn: false,
  error: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_REQUEST:
      return { ...state, isFetching: true }
    case SET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.displayName,
        status: action.payload,
        ownerId: action.payload.uid,
        isFetching: false,
        isLoggedIn: true,
      }
    case SET_USER_UNSUCCESS:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isLoggedIn: false,
      }
    case CHECK_USER_REQUEST:
      return { ...state, isFetching: true }
    case CHECK_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        password: '',
        // user: action.payload.displayName,
        // status: action.payload,
        // ownerId: action.payload.uid,
        isFetching: false,
        isLoggedIn: true,
      }
    case CHECK_USER_UNSUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        displayName: '',
        phone: '',
        ownerID: '',
        password: '',
        email: '',
      }
    case CREATE_USER_REQUEST:
      return { ...state, isFetching: true }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.displayName,
        phone: action.payload.phone,
        status: action.payload.user,
        isFetching: false,
        isLoggedIn: true,
      }
    case CREATE_USER_UNSUCCESS:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isLoggedIn: false,
      }
    case LOG_OUT_USER:
      return initialState
    default:
      return state
  }
}
