import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Animated
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

class detailed extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('WeatherMenu')
                    }} >
                        <Icon name='arrow-left' size={20} color='rgb(0,0,0)'>
                            <Text style={styles.buttonText}> Voltar</Text>
                        </Icon>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Temperatura: {JSON.stringify(navigation.getParam('temp'))}</Text>
                    <Text>Max: {JSON.stringify(navigation.getParam('max'))}</Text>
                    <Text>Min: {JSON.stringify(navigation.getParam('min'))}</Text>
                    <Text>Temperatura Summary: PEGAR SUMMARY QUE VEM COM API</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#555'
    },
})

export default detailed