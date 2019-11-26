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

class weatherOtherDays extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Icon name='cloud' size={wp('6%')} color='white' style={{ marginTop: hp('2%'), marginBottom: hp('8%') }}/>
                <Text style={[styles.text, {marginBottom: 10}]}>{this.props.day}</Text>
                <Text style={styles.text}>{this.props.tempC} ºC</Text>
                <Text style={styles.text}>{this.props.tempF} ºF</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#360234',
        alignItems: 'center',
        // justifyContent: 'center',
        height: hp('31.2%'),
        width: wp('42%'),
        borderRadius: 30,
        // marginRight: wp('4%'),
        // borderWidth: 1,
        borderColor: '#210120',
        elevation: 10,
        overflow: 'hidden'
    },
    text: {
        color: 'white',
        fontSize: wp('6%'),
        fontFamily: Platform.OS === 'ios' ? 'Montserrat Bold' : 'Montserrat-Bold', 
    }
})

export default weatherOtherDays