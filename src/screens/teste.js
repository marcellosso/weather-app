import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Keyboard,
    TouchableHighlight
} from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import RNGooglePlaces from 'react-native-google-places'

import apiKey from '../google_APIKEY'
import _ from "lodash"

class teste extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            place: '',
            latitude: '37.785834',
            longitude: '-122.406417',
            predictions: []
        }
        this.onChangePlaceDebounced = _.debounce(this.onChangePlace, 500)
    }


    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal({})
            .then((place) => {
                console.log(place)
                this.setState({ place: place })
            })
            .catch(err => console.log(err))
    }

    async onChangePlace(place) {
        this.setState({ place })
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${place}&location=${this.state.latitude},${this.state.longitude}&radius=2000`;

        try {
            const result = await fetch(apiUrl);
            const json = await result.json()
            this.setState({
                predictions: json.predictions
            })
        } catch (err) {
            console.error(err)
        }

    }

    pressedPrediction(prediction) {
        Keyboard.dismiss();
        this.setState({
            predictions: [],
            place: prediction.description
        });
        Keyboard;
    }

    render() {

        const predictions = this.state.predictions.map(prediction => (
            <TouchableHighlight key={prediction.id} onPress={() => this.pressedPrediction(prediction)}>
                <Text style={styles.sugestions}>{prediction.description}</Text>
            </TouchableHighlight>
        ))

        return (
            <View style={{ flex: 1 }}>

                <View style={{ margin: 8, backgroundColor: 'white' }}>
                    <View>
                        <TextInput placeholder="Location"
                            value={this.state.place}
                            style={styles.placeInput}
                            onChangeText={place => { this.onChangePlaceDebounced(place), this.setState({ place }) }} />
                        {predictions}
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    sugestions: {
        backgroundColor: 'white',
        padding: 5,
        fontSize: 18,
        borderWidth: 0.5,
        marginLeft: 5,
        marginRight: 5
    },
    placeInput: {
        height: 40,
        borderWidth: 0.5,
        marginTop: 50,
        marginHorizontal: 5,
        padding: 5,
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: hp('3%'),
        // justifyContent: 'center'
        // backgroundColor: '#2a0869'
    },
})

export default teste