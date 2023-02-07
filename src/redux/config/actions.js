export const ADD_MATCH = 'ADD_MATCH'
export const DELETE_MATCH = 'DELETE_MATCH'

export const addMatch = (match = {}) => {
  return {
    type: ADD_MATCH,
    payload: match
  }
}

export const deleteMatch = (matchID = 0) => {
  return {
    type: DELETE_MATCH,
    payload: matchID
  }
}

export const ADD_DOMINO = 'ADD_DOMINO'
export const DELETE_DOMINO = 'DELETE_DOMINO'

export const addDomino = (domino = {}) => {
  return {
    type: ADD_DOMINO,
    payload: domino
  }
}

export const deleteDomino = (dominoID = 0) => {
  return {
    type: DELETE_DOMINO,
    payload: dominoID
  }
}