import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import weatherMenu from './screens/weatherMenu'
import detailed from './screens/detailed'
import weatherMenuNoComment from './screens/weatherMenuNoComment'

const detailedScreen = createSwitchNavigator({
    detailed: detailed,
    weatherMenuNoComment: weatherMenuNoComment,
}, {
    initialRouteName: 'weatherMenuNoComment'
})

export default createAppContainer(detailedScreen)