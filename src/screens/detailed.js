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
    Animated,
    ImageBackground
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import apiKey from '../google_APIKEY'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// TODO COLOCAR REDUX PELO AMOR DE SANTOS CRISTO



class detailed extends Component {
    render() {
        const { navigation } = this.props;
        return (
            // <View>
            <ImageBackground source={{ uri: navigation.getParam('image') }}
                style={styles.imageBG} blurRadius={5} resizeMode='cover'>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('weatherMenuNoComment')
                    }} >
                        <Icon name='arrow-left' size={20} color='rgb(255,255,255)'>
                            <Text style={styles.buttonText}> Voltar</Text>
                        </Icon>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{color:'white'}}>Temperatura: {JSON.stringify(navigation.getParam('temp'))}</Text>
                    <Text style={{color:'white'}}>Max: {JSON.stringify(navigation.getParam('max'))}</Text>
                    <Text style={{color:'white'}}>Min: {JSON.stringify(navigation.getParam('min'))}</Text>
                    <Text style={{color:'white'}}>Temperatura Summary: PEGAR SUMMARY QUE VEM COM API</Text>
                </View>
            </ImageBackground>
            /* </View> */
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        padding: 10,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        // borderColor: 'white'
    },
    imageBG: {
        flex: 1,
        // width: wp('100%'),
        height: hp('100%')
    }
})

export default detailed