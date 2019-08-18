import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default class LocationGetter extends Component {
  constructor(){
    super()
    this.state= {
      loc: null,
      errMes: null
    }
  }

  _getlocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync()
    if (status != "granted") {
      this.setState({
        errMes: "Access to Location Denied"
      })
    }
  }

  componentWillMount() {
    if (Platform.OS === "android" && Constants.isDevice) {
      this._getlocationAsync()
    } else {
      this.setState({
        errMes: "Device is not Android or device is an emulator."
      })
    }
  }

  getLocationHandler = async () => {
    let location = await Location.getCurrentPositionAsync({
      accuracy: 3   // 1 - 6 higher better
    })
    this.setState({
      loc: location
    })
  }

  render() {
    let locText = "Unknown Position"
    if (this.state.loc) {
      console.log(this.state.loc)
      let latitude = this.state.loc.coords.latitude
      let longitude = this.state.loc.coords.longitude
      locText = `Your Position is: \n ${latitude} : ${longitude}`
    } else if(this.state.errMes) {
      locText = this.state.errMes
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Press the Button below to get Your Location!</Text>
        <Button title="Get Location" onPress={this.getLocationHandler} />
        <Text style={styles.text}>{locText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
