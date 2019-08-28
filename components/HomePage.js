import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class HomePage extends Component {
  static navigationOptions = {
    title: 'React Native Playground',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome To React Native Playground!</Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Location")}>
            <Text>Show Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("SaveDatas")}>
            <Text>Save Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("ShowDatas")}>
            <Text>Show Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
});