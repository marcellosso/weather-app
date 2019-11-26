import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import weatherMenu from './screens/weatherMenu'
import detailed from './screens/detailed'

const detailedScreen = createSwitchNavigator({
    detailed: detailed,
    WeatherMenu: weatherMenu,
}, {
    initialRouteName: 'WeatherMenu'
})

export default createAppContainer(detailedScreen)