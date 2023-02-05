export const ADD_MATCH = 'ADD_MATCH'
export const DELETE_MATCH = 'DELETE_MATCH'

export const ADD_ROUND = 'ADD_ROUND'
export const EDIT_ROUND = 'EDIT_ROUND'

export const addMatch = (match = {}) => {
  return {
    type: ADD_MATCH,
    payload: match
  }
}

export const deleteMatch = (matchID = 1) => {
  return {
    type: DELETE_MATCH,
    payload: matchID
  }
}

export const addRound = (roundID = 1, teamAScore = 0, teamBScore = 0, teamAMembers = [], teamBMembers = []) => {
  return {
    type: ADD_ROUND,
    payload: {
      roundID,
      teamAScore,
      teamBScore,
      teamAMembers,
      teamBMembers
    }
  }
}

export const editRound = (roundID = 1, roundData = {}) => {
  return {
    type: EDIT_ROUND,
    roundID,
    roundData
  }
}