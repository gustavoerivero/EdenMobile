import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import colors from '../styled-components/colors'

import HomePage from '../pages/Main/HomePage'

import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styled-components/styles'

const Tab = createBottomTabNavigator()

const bottomRoutes = [
  {
    name: 'Home',
    component: HomePage,
    Icon: ({ color, size }) => (
      <Icon
        name='home-outline'
        color={color}
        size={size}
      />
    )
  },
  {
    name: 'Calendar',
    component: HomePage,
    Icon: ({ color, size }) => (
      <Icon
        name='calendar-outline'
        color={color}
        size={size}
      />
    )
  },
  {
    name: 'Post',
    component: HomePage,
    Icon: ({ size }) => (
      <View
        style={styles.postPage}
      >
        <Icon
          name='clipboard-outline'
          color='#f4f4f4'
          size={size}
        />
      </View>
    )
  },
  {
    name: 'Notification',
    component: HomePage,
    Icon: ({ color, size }) => (
      <Icon
        name='notifications-outline'
        color={color}
        size={size}
      />
    )
  },
  {
    name: 'Profile',
    component: HomePage,
    Icon: ({ color, size }) => (
      <Icon
        name='person-outline'
        color={color}
        size={size}
      />
    )
  },
]

const BottomNavigation = () => {
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
      {bottomRoutes.map(({ name, component, Icon }) => (
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

export default BottomNavigation