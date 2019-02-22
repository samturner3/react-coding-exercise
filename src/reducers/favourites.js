import { ActionType } from 'redux-promise-middleware'
import { FETCH_FAVOURITES, TOGGLE_FAVOURITE, SET_FAVOURITE_ID } from '../actions'

const initialState = {
  busy: false,
  favourites: [],
  favouriteToToggle: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_FAVOURITES}_${ActionType.Pending}`:
      return {
        ...state,
        busy: true
      }
    case `${FETCH_FAVOURITES}_${ActionType.Fulfilled}`:
      return {
        ...state,
        busy: false,
        error: undefined,
        favourites: action.payload
      }
    case `${FETCH_FAVOURITES}_${ActionType.Rejected}`:
      return {
        ...state,
        busy: false,
        favourites: action.payload
      }
    case `${SET_FAVOURITE_ID}`:
      return {
        ...state,
        favouriteToToggle: action.payload.entityId.id
      }
    case `${TOGGLE_FAVOURITE}_${ActionType.Pending}`:
      return {
        ...state,
        busy: true,
        error: undefined
      }
    case `${TOGGLE_FAVOURITE}_${ActionType.Fulfilled}`:
      return {
        ...state,
        busy: false,
        error: undefined,
        favourites: [...state.favourites, state.favouriteToToggle],
        favouriteToToggle: null
      }
    case `${TOGGLE_FAVOURITE}_${ActionType.Rejected}`:
      return {
        ...state,
        busy: false
      }
    default:
      return state
  }
}

export default reducer
