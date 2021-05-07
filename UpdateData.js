import React, { Component } from 'react'
import { View,StyleSheet, Text,  TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'
import { parse } from '@babel/core';

export class UpdateData extends Component {
    
  constructor(props) {
        super(props);
        this.state = {
            id:this.props.route.params.id,
            name:this.props.route.params.name,
            email:this.props.route.params.email,
            phone:this.props.route.params.phone,
            address:this.props.route.params.address
        }
    }

    handleUpdate(){
        // console.log(this.state)
        axios.put(`http://192.168.100.88:8080/dataUser/update/${this.state.id}`,this.state)
        .then( (response) => {
          // console.log(response)
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
                <Text style={styles.title}> Update Name  </Text>
                <TextInput value={this.state.name} placeholder="Name " onChangeText={(data)=>{this.setState({name:data})}}/>
                <Text style={styles.title}> Update Email  </Text>
                <TextInput value={String(this.state.email)} placeholder="Email " onChangeonChangeText={(data)=>{this.setState({email:parseInt(data)})}}/>
                <Text style={styles.title}> Update Phone </Text>
                <TextInput value={this.state.phone} placeholder="Phone" onChangeText={(data)=>{this.setState({phone:data})}}/>
                <Text style={styles.title}> Update Address </Text>
                <TextInput value={this.state.address} placeholder="Address" onChangeText={(data)=>{this.setState({address:data})}}/>
                <TouchableOpacity style={styles.button} onPress={this.handleUpdate.bind(this)}><Text style={styles.title}>Update </Text></TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.replace("App")}}><Text style={styles.title}>Cancel</Text></TouchableOpacity> */}
              
            </View>
        )
    }
}

export default UpdateData

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