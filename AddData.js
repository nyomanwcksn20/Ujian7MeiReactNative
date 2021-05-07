import React, { Component } from 'react'
import { View,StyleSheet, Text,  TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'

export class AddData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            address:""
        }
    }

    handleAdd(){
        console.log(this.state)
        axios.post('http://192.168.100.88:8080/dataUser/add',this.state)
        .then( (response) => {
          console.log(response)
          alert(response.data)
          this.props.navigation.navigate("App")
           
        })
        .catch(function (error) {
        // handle error
         console.log(error);
        })
    }

    render() {
        return (
            <View>
                <Text style={styles.title}> Input Name </Text>
                <TextInput placeholder="Name" onChangeText={(data)=>{this.setState({name:data})}}/>
                <Text style={styles.title}> Input Email </Text>
                <TextInput placeholder="Email" onChangeText={(data)=>{this.setState({email:data})}}/>
                <Text style={styles.title}> Input Phone </Text>
                <TextInput placeholder="Phone" onChangeText={(data)=>{this.setState({phone:data})}}/>
                <Text style={styles.title}> Input Address </Text>
                <TextInput placeholder="Address" onChangeText={(data)=>{this.setState({address:data})}}/>
                <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}><Text style={styles.title}>Tambahkan Data</Text></TouchableOpacity>
              
            </View>
        )
    }
}

export default AddData

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 18,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
    },
  });

