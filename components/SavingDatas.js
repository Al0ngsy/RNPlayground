import React, { Component } from 'react';
import { Platform, 
        StyleSheet, 
        Text, 
        View,
        TouchableOpacity,
        AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export default class SavingDatas extends Component {
    static navigationOptions = {
        title: 'Save Data',
    };

    constructor(props) {
        super(props);
        this.state = {
            Firma: null,
            Menge: null,
            errMes: null,
        }
    }

    componentWillMount() {
        if (Platform.OS === "android" && Constants.isDevice) {
          
        } else {
            this.setState({
                errMes: "Device is not Android or device is an emulator."
            })
            console.log(this.state.errMes)
        }
      }

    saveToFile = async () => {
        console.log("Start Saving.")
        // checking if all data needed are filled out
        if (this.state.Firma === null || this.state.Menge === null) {
            alert("No Data Input To Be Saved.");
            return;
        }

        try {
            // hex key generation 
            const key = '#'+Math.floor(Math.random()*16777215).toString(16)
            console.log(`Key is ${key}`)

            // checking if key was used before
            const data = await AsyncStorage.getItem(key)

            if(data === null){
                let keyObj = await AsyncStorage.getItem("KEYS")
                if (keyObj !== null) {
                    keyObj = JSON.parse(keyObj)
                    keyObj.key.push(key)
                    await AsyncStorage.setItem("KEYS", JSON.stringify(keyObj))
                } else {
                    const keyObj = {
                        key: [key]
                    }
                    await AsyncStorage.setItem("KEYS", JSON.stringify(keyObj))
                }  
                const bestellungObj = {
                    Firma: this.state.Firma,
                    Menge: this.state.Menge
                }
                
                await AsyncStorage.setItem(
                    key,
                    JSON.stringify(bestellungObj)
                )
            } else {
                this.saveToFile()   // recursive magic
                return
            }
        } catch (error) {
            console.log(error)
            alert("Data Failed To Be Saved.")
        }
    }

    testLoad = async () => {
        console.log("Start Loading.")
        try {
            let keyArray = await AsyncStorage.getAllKeys()
            console.log(keyArray)
            let keys = null
            for (let i = 0; i < keyArray.length; i++) {
                if (keyArray[i].toString() == "KEYS") {
                    keys = await AsyncStorage.getItem(keyArray[i])
                    console.log(keys)
                    keys = JSON.parse(keys)
                    console.log(keys)
                }
            }
            keys.key.forEach(async (hexKey) => {
                console.log(`Key is ${hexKey}`)
                let bestellungObj = await AsyncStorage.getItem(hexKey.toString())
                bestellungObj = JSON.parse(bestellungObj)
                console.log(`Bestellung bei der Firma: ${bestellungObj.Firma} mit der Menge: ${bestellungObj.Menge}`)
            });
        } catch (error) {
            alert(error)
        }
    }

    testClear = async () => {
        console.log("Start Clearing.")
        try {
            await AsyncStorage.clear()
            await AsyncStorage.getAllKeys()
            .then(ks =>
                console.log(ks)   
            )
        } catch (error) {
            alert(error)
        }
    }

    onChangeNumber = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("Please Only Number.");
            }
        }
        this.setState({
            Menge: newText
        })
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.containerBody}>
                    <View style={styles.containerBodyElem}>
                        <Text style={styles.text}>Firma</Text>
                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({Firma:text})}
                            value={this.state.Firma}
                        />
                    </View>
                    <View style={styles.containerBodyElem}>
                        <Text style={styles.text}>Menge</Text>
                        <TextInput 
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            onChangeText={(text) => this.onChangeNumber(text)}
                            value={this.state.Menge}
                        />
                    </View>
                </View>
                <View style={styles.containerFooder}>
                    <TouchableOpacity style={styles.button} onPress={this.saveToFile}>
                        <Text>Save to Device</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.testLoad}>
                        <Text>Test Load from Device</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.testClear}>
                        <Text>Clear all</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBody: {
        flex:7,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    containerFooder: {
        flex:3,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    containerBodyElem: {
        marginLeft: 10,
    },
    textInput: {
        height: 40,
        width: 200,
        borderColor: "black",
        borderWidth:1,
        borderLeftWidth:3,
        padding: 10
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        margin: 5,
        padding: 10,
        borderRadius: 5
    },
})