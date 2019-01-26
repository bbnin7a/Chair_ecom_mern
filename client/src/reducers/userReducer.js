import { LOGIN_USER } from '../actions/types'

export default (state= {}, action) => {
  switch(action.type){
    case LOGIN_USER:
      return {...state, loginSucess: action.payload}
    default: 
      return state
  }
}