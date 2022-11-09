import React, { createContext, useEffect, useReducer } from 'react'
import { setSession } from '../services/jwt'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext({})

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const stateReducer = (state, action) => {
  const type = action.type

  switch (type) {
    case 'INITIALIZE': {
      const { isAuthenticated, user } = action.payload
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      }
    }

    case 'LOGIN': {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }

    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessID = await AsyncStorage.getItem('@id')
        const accessToken = await AsyncStorage.getItem('@token')

        if (!accessToken) {
          setSession(null)
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
          return
        }

        await setSession(accessID, accessToken)

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user: {
              id: accessID,
              token: accessToken,
            },
          },
        })
      } catch (error) {
        setSession(null)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }
    initialize()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}