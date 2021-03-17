import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import * as RootNavigation from '../../RootNavigation.js';

const authReducer = (state, action) => {
  switch(action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload}
    case 'signin':
      return {...state, errorMessage: '', token: action.payload}
    case 'clear_error_message':
      return {...state, errorMessage: ''}
    case 'signout':
      return {...state, token: null, errorMessage: ''}
    default:
      return state
  }
}


const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'})
}

const signin = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signin', {email, password})
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({type:'signin', payload: response.data.token})
    } catch (err) {
      console.log(err)
      dispatch({type: 'add_error', payload: 'Something went wrong with signin'})
    }
  }
}

const signup = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signup', {email, password})
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({type:'signin', payload: response.data.token})
    } catch (err) {
      dispatch({type: 'add_error', payload: 'Something went wrong with signup'})
    }
  }
}

const signout = (dispatch) => {
  return async () => {
    AsyncStorage.removeItem('token')
    dispatch({type: 'signout'})
  }
}

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    dispatch({type: 'signin', payload: token})
  }
}

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signup, signout, clearErrorMessage, tryLocalSignIn},
  {token: null, errorMessage: ''}
  )