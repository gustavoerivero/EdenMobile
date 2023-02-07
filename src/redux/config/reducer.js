import { ADD_MATCH, DELETE_MATCH, ADD_DOMINO, DELETE_DOMINO } from './actions'

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
  },
  domino: {
    started: false,
    completed: false,
    tournamentId: null,
    id: null,
    title: null,
    date: new Date(),
    maxPoints: 0,
    maxTime: 0,
    selectedTeam: null,
    initialTeam: null,
    teamA: null,
    teamB: null,
    teamAScore: 0,
    teamBScore: 0,
    teamAMembers: [],
    teamBMembers: [],
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
        match: initialState.match
      }
    }

    case ADD_DOMINO: {
      return {
        ...state,
        domino: { ...state.domino, ...action.payload }
      }
    }

    case DELETE_DOMINO: {
      return {
        ...state,
        domino: initialState.domino
      }
    }

    default:
      return state
  }
}
