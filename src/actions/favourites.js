export const FETCH_FAVOURITES = 'FETCH_FAVOURITES'
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'
export const SET_FAVOURITE_ID = 'SET_FAVOURITE_ID'

export const fetchFavouritesActionCreator = promise => ({
  type: FETCH_FAVOURITES,
  payload: promise
})

export const setFavouriteActionCreator = entityId => ({
  type: SET_FAVOURITE_ID,
  payload: { entityId }
})

export const toggleFavouriteActionCreator = promise => ({
  type: TOGGLE_FAVOURITE,
  payload: promise
})
