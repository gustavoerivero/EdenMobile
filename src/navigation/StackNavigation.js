import { createNativeStackNavigator } from '@react-navigation/native-stack'

import EventPage from '../pages/Events/EventPage'

import LoginBottomNavigation from './LoginBottomNavigation'
import BottomNavigation from './BottomNavigation'

import useAuthContext from '../hooks/useAuthContext'

import styles from './styled-components/styles'
import CreoleBallsTournamentPage from '../pages/CreoleBalls/CreoleBallsTournamentPage'
import CreoleBallsListPage from '../pages/CreoleBalls/CreoleBallsListPage'
import PlayerRoster from '../pages/CreoleBalls/PlayerRoster'

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