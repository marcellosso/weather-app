import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    Platform,
    Animated,
    Keyboard,
    TouchableHighlight,
    FlatList,
    Button
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import WeatherDay from '../components/weatherDay'
import WeatherOtherDays from '../components/weatherOtherDays'
// import Detailed from '../screens/detailed'
import  Modal  from 'react-native-modal'

import apiKey from '../google_APIKEY'
import weatherAPI from '../weather_APIKEY'
import _ from "lodash"

class weatherMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            place: '',
            latitude: '-23.9618',
            longitude: '-46.3322',
            locationPredictions: [],
            animatePress: new Animated.Value(1),
            weatherToday: '',
            weatherWeek: [],
            todayDate: '',
            dateTime: ''
        }
        this.onChangePlaceDebounced = _.debounce(this.onChangePlace, 500)
    }

    componentDidMount() {
        this.getWeather()
    }

    async onChangePlace(place) {
        this.setState({ place })
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${place}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;

        try {
            const result = await fetch(apiUrl);
            const json = await result.json()
            this.setState({
                locationPredictions: json.predictions
            })

        } catch (err) {
            console.error(err)
        }

    }

    async getWeather() {
        const url = `https://api.darksky.net/forecast/${weatherAPI}/${this.state.latitude},${this.state.longitude}?exclude=hourly,minutely&units=si`

        try {
            const result = await fetch(url)
            const jsonRes = await result.json()

            this.setState({
                weatherToday: jsonRes.currently,
                weatherWeek: jsonRes.daily.data,
                todayDate: jsonRes.currently.time + '000'
            })

        } catch (err) {
            console.log(err)
        }
    }

    pressedPrediction(prediction) {
        Keyboard.dismiss();
        this.setState({
            locationPredictions: [],
            place: prediction.description
        });
        Keyboard;
    }

    animateIn() {
        this.setState({
            isVisible: !this.state.isVisible
        })
        Animated.timing(this.state.animatePress, {
            toValue: 0.3,
            duration: 400
        }).start()
    }

    animateOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 400
        }).start()
    }

    renderInput = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    fahrenheit = (temp) => {
        return temp * 9 / 5 + 32
    }

    getDayName = (date) => {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return days[date]
    }

    dateTime = (date) => {
        let dateTime = new Date(parseInt(`${date}000`))
        return this.getDayName(dateTime.getDay())
    }

    toggleModal = () => {
        this.setState({ isVisible: !this.state.isVisible });
      };

    render() {
        const locationPredictions = this.state.locationPredictions.map(prediction => (
            <TouchableHighlight key={prediction.id} onPress={() => this.pressedPrediction(prediction)}>
                <Text style={styles.sugestions}>{prediction.description}</Text>
            </TouchableHighlight>
        ))

        const weatherOthers = this.state.weatherWeek.slice(1).map(weather => (
            <TouchableOpacity key={weather.id} onPress={() => {this.props.navigation.navigate('detailed', {
                temp: weather.temperatureMin, max: weather.temperatureMax, min: weather.temperatureMin
            })}}>
                {/* {console.log((weather.time + '000'))} */}
                <WeatherOtherDays key={weather.id} day={this.dateTime(weather.time)}
                    tempC={weather.temperatureMin} tempF={this.fahrenheit(weather.temperatureMin).toFixed(1)} />
            </TouchableOpacity>
        ))

        // const cardOpacity = this.state.scrollX.interpolate({
        //     inputRange: [0, 120],
        //     outputRange: [200, 20]
        // })

        // TODO: ADD THE SEARCH LOCATION INPUT IN A MODAL 
        // (ADICIONAR O INPUT DE LOCALIZAÇÃO EM UM MODAL)

        return (
            // 
            <LinearGradient locations={[0.3, 1]} colors={['#61045f', '#210520']} style={styles.linearGradient}>
                <View style={styles.container}>

                    <Modal isVisible={this.state.isVisible}>
                        <View style={{ flex: 1 }}>
                            <Text>Hello!</Text>
                            <Button title="Hide modal" onPress={this.toggleModal} />
                        </View>
                    </Modal>

                    {/* {this.state.isVisible ? <TextInput placeholder='Location'
                        placeholderTextColor='white' style={styles.input}
                        value={this.state.place}
                        onChangeText={place => { this.onChangePlaceDebounced(place), this.setState({ place }) }} /> : null} */}
                    {/* <TextInput placeholder='Location' 
                        placeholderTextColor='white' style={styles.input}
                        value={this.state.place} 
                        onChangeText={place => {this.onChangePlaceDebounced(place), this.setState({ place })}}/> */}

                    {locationPredictions}
                    {/* {console.log(this.state.locationPredictions)}
                    <FlatList 
                        style={{ position: 'absolute' }}
                        data={this.state.locationPredictions}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <TouchableHighlight style={{ zIndex: 2 }} onPress={() => this.pressedPrediction(item)}>
                                <Text style={styles.sugestions}>{item.description}</Text>
                            </TouchableHighlight>}
                    /> */}

                    <View style={{ height: hp('2%') }}></View>

                    {/* <Animated.View style={{
                        transform: [
                            {
                                scale: this.state.animatePress
                            }
                        ], width: '85%', borderRadius: 25
                    }}> */}
                        {/* '#0a5b70', '#0492b5', '#45daff'  -- 0.2,0.5,1*/}
                        {/* '#2a0833', '#58106b' */}
                        <LinearGradient colors={['#9002d1', '#e205ff']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            locations={[0.3, 1]}
                            style={{
                                borderRadius: 25, alignItems: 'center', paddingVertical: wp('1.2%'),
                                paddingHorizontal: 60, justifyContent: 'center'
                            }}>

                            {/* <TouchableWithoutFeedback style={styles.button}
                                onPress={() => { this.setState({ locationPredictions: [], place: '' }), this.getWeather() }}
                                onPressIn={() => { this.animateIn() }}
                                onPressOut={() => { this.animateOut() }}
                            > */}
                            <TouchableWithoutFeedback style={styles.button}
                                onPress={() => { this.setState({ locationPredictions: [], place: '' }), this.getWeather(), this.toggleModal() }}
                            >

                                <Icon name='map-marker' size={22} color='white'>
                                    <Text style={styles.buttonText}>   Change Location</Text>
                                </Icon>

                            </TouchableWithoutFeedback>
                        </LinearGradient>
                    {/* </Animated.View> */}
                    <View style={styles.infoContainer}>
                        <View style={{
                            flexDirection: 'row', marginBottom: hp('3%'), borderBottomWidth: 1,
                            borderColor: 'gray', paddingBottom: hp('2%')
                        }}>
                            <Icon name='arrow-right' size={23} color='white'>
                                <Text style={styles.mainText}> Wind</Text>
                            </Icon>
                            <Text style={{
                                fontFamily: Platform.OS === 'ios' ? 'Montserrat Regular' : 'Montserrat-Regular',
                                marginLeft: wp('38%'), fontSize: 23, color: 'white'
                            }}>
                                0 km/h
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', marginBottom: hp('3%'), borderBottomWidth: 1,
                            borderColor: 'gray', paddingBottom: hp('2%')
                        }}>
                            <Icon name='arrow-right' size={23} color='white'>
                                <Text style={styles.mainText}> PRECIPITATION</Text>
                            </Icon>
                            <Text style={{
                                fontFamily: Platform.OS === 'ios' ? 'Montserrat Regular' : 'Montserrat-Regular',
                                marginLeft: wp('18%'), fontSize: 23, color: 'white'
                            }}>
                                0 %
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row', borderBottomWidth: 1,
                            borderColor: 'gray', paddingBottom: hp('2%')
                        }}>
                            <Icon name='arrow-right' size={23} color='white'>
                                <Text style={styles.mainText}> HUMIDITY</Text>
                            </Icon>
                            <Text style={{
                                fontFamily: Platform.OS === 'ios' ? 'Montserrat Regular' : 'Montserrat-Regular',
                                marginLeft: wp('34%'), fontSize: 23, color: 'white'
                            }}>
                                0 %
                            </Text>
                        </View>
                    </View>

                    <View style={styles.listContainer}>
                        <ScrollView scrollEventThrottle={160} horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity>
                                <WeatherDay day={this.dateTime(this.state.todayDate)} tempC={this.state.weatherToday.temperature}
                                    tempF={this.fahrenheit(this.state.weatherToday.temperature).toFixed(1)} />
                            </TouchableOpacity>
                            <View style={{ marginTop: hp('8.9%') }}>
                                {/* <Animated.ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}
                                        showsHorizontalScrollIndicator={false}>
                                        <WeatherOtherDays day={this.getDay(this.state.todayDate + 1)} tempC="19" tempF="66.2" />
                                        <WeatherOtherDays day={this.getDay(this.state.todayDate + 2)} tempC="10" tempF="50" />
                                        <WeatherOtherDays day={this.getDay(this.state.todayDate + 3)} tempC="5" tempF="41" />
                                    </Animated.ScrollView> */}
                                <Animated.ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}
                                    showsHorizontalScrollIndicator={false}>

                                    {weatherOthers}

                                </Animated.ScrollView>
                            </View>
                        </ScrollView>
                    </View>


                </View>
            </LinearGradient>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: hp('3%'),
        // justifyContent: 'center'
        // backgroundColor: '#2a0869'
    },
    linearGradient: {
        // flex: 1,
        width: '100%',
        height: '100%'
    },
    button: {
        paddingVertical: hp('5%'),
        width: '100%',
        // backgroundColor: 'black',
    },
    buttonText: {
        fontFamily: Platform.OS === 'ios' ? 'Calistoga Regular' : 'Calistoga-Regular',
        fontSize: 22,
        // textShadowColor:'black',
        // textShadowOffset: {width: 3, height: 3},
        // textShadowRadius: 10,
    },
    input: {
        width: wp('80%'),
        height: hp('8%'),
        borderBottomWidth: 2,
        borderColor: '#9ea2a3',
        color: 'white',
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        paddingBottom: 0,
        marginBottom: 10,
        fontSize: 18
    },
    infoContainer: {
        width: wp('80%'),
        alignItems: 'flex-start',
        marginTop: hp('3%'),
        zIndex: 1
    },
    mainText: {
        fontFamily: Platform.OS === 'ios' ? 'Montserrat Bold' : 'Montserrat-Bold',
        paddingBottom: 5,
        textShadowColor: 'black',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 10,
    },
    listContainer: {
        // backgroundColor: 'black',
        marginTop: 30,
        marginBottom: 30,
        // paddingLeft: wp('20%'),
        height: hp('42%'),
        width: wp('87%'),
        // width: wp('100%'),
        overflow: 'hidden',
        justifyContent: 'center',
    },
    sugestions: {
        // backgroundColor: 'white',
        height: hp('10%'),
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        borderWidth: 0.5,
        width: wp('80%'),
        borderRadius: 10,
        color: 'white',
    },
})

export default weatherMenu