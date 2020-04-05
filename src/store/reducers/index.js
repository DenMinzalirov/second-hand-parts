import { combineReducers } from 'redux'
import { userReducer } from './user'
import { dataBaseReducer } from './dataBase'

export const rootReducer = combineReducers({
  userInfo: userReducer,
  dataBase: dataBaseReducer,
})
