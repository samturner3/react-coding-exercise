/* global fetch:false */
import get from 'lodash/get'
import { fetchEventsActionCreator, fetchFavouritesActionCreator, REHYDRATED } from '../actions'
import { eventTypeIdFilterSelector, getEventsApiUrl, getFavouritesApiUrl } from '../selectors'
import qs from 'query-string'

const fetchEvents = async (apiUrl, eventTypeId) => {
  let url = apiUrl
  if (eventTypeId) {
    url += '?' + qs.stringify({ eventTypeId })
  }
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  const events = get(data, ['results', 'events'])

  if (!response.ok || !data.success || !events) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to fetch events')
    error.status = response.status
    throw error
  }

  return events
}

const fetchFavourites = async (favouritesApiUrl) => {
  let url = favouritesApiUrl
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  const favourites = data

  if (!response.ok || !favourites) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to fetch favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

export default store => next => action => {
  const ret = next(action)

  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getEventsApiUrl(state)
    const favouritesApiUrl = getFavouritesApiUrl(state)
    const eventTypeId = eventTypeIdFilterSelector(state)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(favouritesApiUrl)))
    store.dispatch(fetchEventsActionCreator(fetchEvents(apiUrl, eventTypeId)))
  }

  return ret
}
