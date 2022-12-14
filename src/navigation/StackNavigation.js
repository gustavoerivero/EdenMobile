import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from '../pages/Login/LoginPage'
import EventPage from '../pages/Events/EventPage'

import BottomNavigation from './BottomNavigation'

import useAuthContext from '../hooks/useAuthContext'

import styles from './styled-components/styles'
import CreoleBallsTournamentPage from '../pages/CreoleBalls/CreoleBallsTournamentPage'
import CreoleBallsListPage from '../pages/CreoleBalls/CreoleBallsListPage'

const Stack = createNativeStackNavigator()

const stackRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    requireAuth: false,
    options: {
      headerShown: false
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
    requireAuth: true,
    options: {
      headerShown: false,
    }
  },

  {
    name: 'CreoleBallsTournamentPage',
    component: CreoleBallsTournamentPage,
    requireAuth: true,
    options: {
      headerShown: false,
    }
  },

  {
    name: 'CreoleBallsListPage',
    component: CreoleBallsListPage,
    requireAuth: true,
    options: {
      headerShown: false,
    }
  },

]

const StackNavigation = () => {

  const {
    state: { isAuthenticated },
  } = useAuthContext()

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