import { createNativeStackNavigator } from '@react-navigation/native-stack'

import useAuthContext from '../hooks/useAuthContext'

import styles from './styled-components/styles'

import LoginBottomNavigation from './LoginBottomNavigation'
import BottomNavigation from './BottomNavigation'

import EventPage from '../pages/Events/EventPage'

import CreoleBallsTournamentPage from '../pages/CreoleBalls/CreoleBallsTournamentPage'
import CreoleBallsListPage from '../pages/CreoleBalls/CreoleBallsListPage'
import PlayerRoster from '../pages/CreoleBalls/PlayerRoster'
import StartedGamePage from '../pages/CreoleBalls/StartedGamePage'
import ColorTeamPage from '../pages/CreoleBalls/ColorTeamPage'
import PlayTeamAPage from '../pages/CreoleBalls/PlayTeamAPage'
import PlayTeamBPage from '../pages/CreoleBalls/PlayTeamBPage'
import PlayerShootDataPage from '../pages/CreoleBalls/PlayerShootDataPage'
import ScoreSetPage from '../pages/CreoleBalls/ScoreSetPage'
import RoundNextPage from '../pages/CreoleBalls/RoundNextPage'
import CreoleResult from '../pages/CreoleBalls/CreoleResult'

import CommentPage from '../pages/Comments/CommentPage'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {

  const {
    state: { isAuthenticated },
  } = useAuthContext()

  const stackRoutes = [
    {
      name: 'Login',
      component: LoginBottomNavigation,
      requireAuth: false,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'SignIn',
      component: BottomNavigation,
      requireAuth: true,
      options: {
        headerShown: false,
      }
    },
  
    {
      name: 'EventPage',
      component: EventPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },

    {
      name: 'CreoleBallsTournamentPage',
      component: CreoleBallsTournamentPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
  
    {
      name: 'CreoleBallsListPage',
      component: CreoleBallsListPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'PlayerRoster',
      component: PlayerRoster,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'StartedGamePage',
      component: StartedGamePage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'ColorTeamPage',
      component: ColorTeamPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'PlayTeamAPage',
      component: PlayTeamAPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'PlayTeamBPage',
      component: PlayTeamBPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'PlayerShootDataPage',
      component: PlayerShootDataPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'ScoreSetPage',
      component: ScoreSetPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'RoundNextPage',
      component: RoundNextPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
    {
      name: 'CreoleResult',
      component: CreoleResult,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },

    {
      name: 'Comentarios',
      component: CommentPage,
      requireAuth: isAuthenticated,
      options: {
        headerShown: false,
      }
    },
  
  ]

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={styles.stackStyles}
    >
      {stackRoutes
        .filter(({ requireAuth }) => requireAuth === isAuthenticated)
        .map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
    </Stack.Navigator>
  )

}

export default StackNavigation