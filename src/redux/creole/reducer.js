import { ADD_MATCH, ADD_ROUND, DELETE_MATCH, EDIT_ROUND } from './actions'

const initialState = {
  match: {
    id: null,
    date: new Date(),
    teamA: null,
    teamB: null,
    teamAScore: 0,
    teamBScore: 0,
    rounds: []
  }
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ADD_MATCH: {
      return {
        ...state,
        match: { ...state.match, ...action.payload }
      }
    }

    case DELETE_MATCH: {
      return {
        ...state,
        match: initialState
      }
    }

    case ADD_ROUND: {
      return {
        ...state,
        rounds: [...state.rounds, action.payload]
      }
    }

    case EDIT_ROUND: {
      return {
        ...state,
        rounds: state.rounds.map(round => {
          if (round.id === action.roundData.id) {
            return {
              roundData: round.roundData.map(data => {
                if (data.id === action.roundData.id) {
                  return action.roundData
                }
                return data
              })
            }
          }
          return round
        })
      }
    }

    default:
      return state
  }
}
