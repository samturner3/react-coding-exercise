export const isFavoritedSelector = (state, id) => getFavouritedList(state).includes(id) && true // TODO implement
export const getFavouritedList = state => state.favourites.favourites
