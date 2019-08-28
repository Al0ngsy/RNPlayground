import React, { Component } from 'react';
import { Platform, 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        AsyncStorage,
        FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

export default class ShowingDatas extends Component {
    static navigationOptions = {
        title: 'Show Data',
    };

    constructor(props) {
        super(props);
        this.state = {
            Data: null,
            errMes: null,
            search: ""
        }
    }

    _getDataFromDeviceAsync = async () => {
        console.log("Start Loading.")
        try {
            let keyArray = await AsyncStorage.getAllKeys()
            let keys = null
            for (let i = 0; i < keyArray.length; i++) {
                if (keyArray[i].toString() == "KEYS") {
                    keys = await AsyncStorage.getItem(keyArray[i])
                    console.log(keys)
                    keys = JSON.parse(keys)
                    console.log(keys)
                }
            }
            let dataArray = []
            keys.key.forEach(async (hexKey) => {
                let bestellungObj = await AsyncStorage.getItem(hexKey.toString())
                bestellungObj = JSON.parse(bestellungObj)
                dataArray.push(bestellungObj)
                this.setState({
                    Data: dataArray
                })
            });
        } catch (error) {
            alert("Beim Aufruf der Daten ist etwas schief gelaufen.")
        }
    }

    componentWillMount() {
        if (Platform.OS === "android" && Constants.isDevice) {
          this._getDataFromDeviceAsync()
        } else {
            this.setState({
                errMes: "Device is not Android or device is an emulator."
            })
            console.log(this.state.errMes)
        }
    }

    renderSeperator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "88%",
                    backgroundColor: "#CED0CE",
                }}
            ></View>
        )
    }

    updateSearch = search => {
        this.setState({
            search
        })
    }

    renderHeader = () => {
        return (<SearchBar 
                placeholder="Suche ..." 
                onChangeText={this.updateSearch}
                value={this.state.search}
                lightTheme />)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.Data}
                    renderItem={({ item }) => <Text style={styles.item}>{`Bestellung bei der Firma: ${item.Firma} mit der Menge: ${item.Menge}`}</Text>}     
                    ItemSeparatorComponent={this.renderSeperator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    item: {
        padding: 10,
        fontSize: 18,
      },
});