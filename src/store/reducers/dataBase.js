import {
  GET_BASE_REQUEST,
  GET_BASE_SUCCESS,
  // GET_BASE_UNSUCCESS,
  GET_USER_OWNER_REQUEST,
  GET_USER_OWNER_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_MY_BASE_REQUEST,
  GET_MY_BASE_SUCCESS,
  CLEAR_BASE,
} from '../actions/dataBaseAction'

const initialState = {}

export function dataBaseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_BASE_REQUEST:
      return { ...state, isFetching: true }
    case GET_MY_BASE_SUCCESS:
      return {
        ...state,
        myOrders: action.payload,
        isFetching: false,
      }
    case GET_BASE_REQUEST:
      return { ...state, isFetching: true }
    case GET_BASE_SUCCESS:
      return {
        ...state,
        baseOrders: action.payload,
        isFetching: false,
      }
    case GET_ALL_USERS_REQUEST:
      return { ...state, isFetching: true }
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
        isFetching: false,
      }
    case GET_USER_OWNER_REQUEST:
      return { ...state, isFetching: true }
    case GET_USER_OWNER_SUCCESS:
      return {
        ...state,
        userOwnerPhone: action.payload,
        isFetching: false,
      }
    case CLEAR_BASE:
      return { ...initialState, isFetching: false }
    default:
      return state
  }
}
