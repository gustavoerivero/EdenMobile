import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import colors from '../styled-components/colors'

import HomePage from '../pages/Main/HomePage'
import CalendarPage from '../pages/Main/CalendarPage'
import UserPage from '../pages/Main/UserPage'

import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styled-components/styles'

const Tab = createBottomTabNavigator()

const bottomRoutes = [
  {
    name: 'Calendar',
    component: CalendarPage,
    Icon: ({ color, size }) => (
      <Icon
        name={color === colors.navBar.activeColor ? 'calendar' : 'calendar-outline'}
        color={color}
        size={size}
      />
    )
  },
  {
    name: 'Home',
    component: HomePage,
    Icon: ({ color, size }) => (
      <View
        style={styles.postPage}
      >
        <Icon
          name={color === colors.navBar.activeColor ? 'home' : 'home-outline'}
          color='#f4f4f4'
          size={size}
        />
      </View>
    )
  },
  {
    name: 'Profile',
    component: UserPage,
    Icon: ({ color, size }) => (
      <Icon
        name={color === colors.navBar.activeColor ? 'person' : 'person-outline'}
        color={color}
        size={size}
      />
    )
  },
]

const LoginBottomNavigation = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.navBar.activeColor,
        tabBarInactiveTintColor: colors.navBar.inactiveColor,
        tabBarInactiveBackgroundColor: colors.base,
        tabBarActiveBackgroundColor: colors.base,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: '7%',
        },
      }}
    >
      {bottomRoutes
      .map(({ name, component, Icon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              tabBarIcon: Icon,
              tabBarShowLabel: false,
            }}
          />
        ))}
    </Tab.Navigator>
  )
}

export default LoginBottomNavigation