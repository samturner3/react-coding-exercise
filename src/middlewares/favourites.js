/* global fetch:false */
import get from 'lodash/get'
import { toggleFavouriteActionCreator, SET_FAVOURITE_ID } from '../actions'
import { getFavouritesApiUrl } from '../selectors'

const addFavourite = async (apiUrl, id) => {
  let url = apiUrl + '/' + id
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to add favourite')
    error.status = response.status
    throw error
  }

  return data
}

const removeFavourite = async (apiUrl, id) => {
  let url = apiUrl + '/' + id
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to delete favourite')
    error.status = response.status
    throw error
  }

  return data
}

export default store => next => action => {
  const ret = next(action)

  if (action.type === SET_FAVOURITE_ID) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    if ((state.favourites.favourites).includes(state.favourites.favouriteToToggle)) {
      store.dispatch(toggleFavouriteActionCreator(removeFavourite(apiUrl, state.favourites.favouriteToToggle)))
    } else {
      store.dispatch(toggleFavouriteActionCreator(addFavourite(apiUrl, state.favourites.favouriteToToggle)))
    }
  }

  return ret
}
