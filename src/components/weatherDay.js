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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

class weatherDay extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Icon name='cloud' size={45} color='#360234' style={{ marginTop: hp('2%'), marginBottom: hp('5%') }}/>
                <Text style={[styles.text, {marginBottom: 10}]}>{this.props.day}</Text>
                <Text style={styles.text}>{this.props.tempC} ºC</Text>
                <Text style={styles.text}>{this.props.tempF} ºF</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        height: hp('40%'),
        width: wp('45%'),
        borderRadius: 30,
        // marginRight: wp('4%'),
        // borderWidth: 1,
        borderColor: '#210120',
        elevation: 10,
        overflow: 'hidden'
    },
    text: {
        color: '#360234',
        fontSize: wp('10%'),
        fontFamily: Platform.OS === 'ios' ? 'Montserrat Bold' : 'Montserrat-Bold', 
    }
})

export default weatherDay