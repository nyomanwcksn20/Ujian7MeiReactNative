import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios'

export default class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            data: [],
            name:"",
        };

    }

    componentDidMount(){
      this.getData();
    }
    componentDidUpdate(){
      this.getData();
    }

   

    getData =()=>{
        //Make a request for a user with a given ID
        axios.get(`http://192.168.100.88:8080/dataUser/${this.state.name}`)
        .then( (response) => {
          // console.log(response.data")
          let data=response.data;   
          this.setState({data:data}); 
        })
        .catch(function (error) {
        // handle error
         console.log(error);
        })
    }

    deleteData(id){
      console.log(id);
      axios.delete(`http://192.168.100.88:8080/dataUser/delete/${id}`)
      .then( (response) => {
        // console.log(response.data")
          alert(response.data)
      })
      .catch(function (error) {
      // handle error
       console.log(error);
      })
    }
      
    renderItem = ({ item }) => (
        <View style = {{borderWidth:2, borderColor:"black"}}>
            <Text style={styles.title}>Name : {item.name}</Text>
            <Text style={styles.title}>Email : {item.email}</Text>
            <Text style={styles.title}>Phone : {item.phone  }</Text>
            <Text style={styles.title}>Address : {item.address  }</Text>
            <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("UpdateData",item)}} style={styles.buttonupd}><Text style={styles.title}>Update Data</Text></TouchableOpacity>
            <TouchableOpacity  onPress={()=>{Alert.alert('Anda yakin?',
              'Menghapus data ini',[
                {text: 'TIDAK', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YA', onPress: () => this.deleteData(item.id)},
              ])}} 
              style={styles.buttondlt}>
                <Text style={styles.title}>Delete Data</Text>
            </TouchableOpacity>
              
        </View>
    )

    render() {
        return (
          <SafeAreaView style={styles.container}>
            <TextInput
              style={{borderWidth: 1, margin: 5}}
              TextInput
              placeholder="Cari"
              onChangeText={data => {
                this.setState({name: data});
              }}
            />
            {/* <TouchableOpacity onPress={this.getData.bind(this)} style={styles.button}><Text style={styles.title}>Cari</Text></TouchableOpacity> */}

            <FlatList 
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddData');
              }}
              style={styles.btn}>
              <Text style={styles.title}>Register</Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 18,
    },
    buttonupd: {
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 5,
      marginTop: 5,
      alignItems: "center",
      backgroundColor: "#87a621",
      padding: 10,
    },

    buttondlt: {
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 5,
      marginTop: 5,
      alignItems: "center",
      backgroundColor: "#a83e20",
      padding: 10,
    },

    btn: {
      margin:10,
      alignItems: "center",
      backgroundColor: "#219c43",
      padding: 10,
    },
  });

  //npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view 