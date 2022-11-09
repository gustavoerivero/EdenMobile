import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from '../pages/Login/LoginPage'

import useAuthContext from '../hooks/useAuthContext'

import colors from '../styled-components/colors'

const Stack = createNativeStackNavigator()

const stackRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    requireAuth: false,
    options: {
      headerShown: false
    }
  }
]

const StackNavigation = () => {

  const {
    state: { isAuthenticated },
  } = useAuthContext()

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary,
      }}
    >
      {
        stackRoutes
          .filter(({ requireAuth }) => requireAuth === isAuthenticated)
          .map(({ name, component, options }) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={options}
            />
          ))
      }
    </Stack.Navigator>
  )

}

export default StackNavigation