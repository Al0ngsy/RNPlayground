import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export default class HomePage extends Component {
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
        console.log("Saving to Storage")
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
                <View style={styles.containerHeader}>
                    <Text style={styles.header}>Save Datas</Text>
                </View>   
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
                    <View style={styles.containerBodyElem}>
                        <Button 
                            title="Save"
                            onPress={this.saveToFile}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "blue",
        borderWidth:2
    },
    containerHeader: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderColor: "red",
        borderWidth:2
      },
    containerBody: {
        flex:8,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: '#F5FCFF',
        borderColor: "green",
        borderWidth:2
    },
    containerFooder: {
        flex:2,
        flexDirection: "row-reverse",
        alignItems: 'flex-end',
        backgroundColor: '#F5FCFF',
        borderColor: "green",
        borderWidth:2
    },
    containerBodyElem: {
        marginBottom: 80,
        marginRight: 50,
        borderColor: "yellow",
        borderWidth:2
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
        textAlign: 'center',
        margin: 20
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
      }
})