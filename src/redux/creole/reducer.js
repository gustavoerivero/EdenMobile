import { ADD_MATCH, ADD_ROUND, DELETE_MATCH, EDIT_ROUND } from './actions'

const initialState = {
  match: {
    started: false,
    completed: false,
    tournamentId: null, 
    id: null,
    title: null,
    date: new Date(),
    maxPoints: 0,
    forfeit: 0,
    maxTime: 0,
    selectedTeam: null,
    initialTeam: null,
    teamA: null,
    teamB: null,
    teamAScore: 0,
    teamBScore: 0,
    colorTeamA: null,
    colorTeamB: null,
    teamAMembers: [],
    teamBMembers: [],
    rosterTeamA: [],
    rosterTeamB: [],
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
