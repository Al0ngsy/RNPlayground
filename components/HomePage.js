import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class HomePage extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome To React Native Playground!</Text>
        <Button
            title="Go To Location Finder"
            onPress={() => this.props.navigation.navigate("Location")}
        />
        <Button 
        style={styles.button}
            title="Go to Saving Datas"
            onPress={() => this.props.navigation.navigate("SaveDatas")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});