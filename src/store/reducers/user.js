import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_UNSUCCESS,
  CHECK_USER_REQUEST,
  CHECK_USER_SUCCESS,
  CHECK_USER_UNSUCCESS,
} from '../actions/userAction'

const initialState = {
  user: '',
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
        user: action.payload.user,
        password: action.payload.password,
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
        user: action.payload.displayName,
        status: action.payload,
        isFetching: false,
        isLoggedIn: true,
      }
    case CHECK_USER_UNSUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
      }
    default:
      return state
  }
}
