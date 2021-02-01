import _ from 'lodash'

export function paginate(items, pageNumber, pageSize) {
   const startIndex = (pageNumber - 1) * pageSize 
    let movies = _.slice(items, startIndex)
    movies = _.take(movies, pageSize)
    return movies
}