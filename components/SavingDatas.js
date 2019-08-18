import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export default class SavingDatas extends Component {
    static navigationOptions = {
        title: 'Save Data',
    };

    constructor(props) {
        super(props);
        this.state = {
            Firma: "",
            Menge: "",
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
        // checking if all data needed are filled out
        /**code here */
        // saving/append state to an external File
        /**code here */
        console.log("Saving to Device Storage")
        alert("Data Saved.");
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
        flex:8,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    containerFooder: {
        flex:2,
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