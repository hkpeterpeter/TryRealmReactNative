
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Button, TextInput
} from 'react-native';

import realm from  './realm' ;
import UserView from './UserView';

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

export default class App extends Component {

  constructor(props) {
    super(props);
    let users =  realm.objects('User');
    if ( users.length == 0) {
      // populate the seed data here..

      let seedUsers= [
        {firstName: 'Peter', lastName: 'Chung', password: 'xxx'},
        {firstName: 'Ann', lastName: 'Lee', password: 'xxx'},
        {firstName: 'John', lastName: 'Tsang', password: 'xxx'}
      ];

      realm.write(() => {

          seedUsers.forEach(
            (user) => {
              realm.create('User', user);
            }
          );
      });
    }

    this.state = {
      users: users,
      firstName: "",
      lastName: "",
      password: "",
    }

     this.handleDeleteAll = this.handleDeleteAll.bind(this);
     this.handleAddOneUser = this.handleAddOneUser.bind(this);
  }

  updateUsersState() {
    let users = realm.objects('User');
    this.setState(
      {users: users}
    );
  }

  handleDeleteAll() {
    realm.write(() => {
      let allUsers = realm.objects('User');
      realm.delete(allUsers);
    });
    this.updateUsersState();
  }

  handleAddOneUser() {
    realm.write(() => {
        realm.create('User',
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: SHA256(this.state.password).toString(),
          }
        );
    });
    this.setState( {
      firstName: "",
      lastName: "",
      password: "",
    });
    this.updateUsersState();
  }

  render() {
    const userViewItems = this.state.users.map(
      (user) =>  <UserView user={user} />
    );
    return (
      <View style={styles.container} >

        <Text style={{fontSize:20, marginBottom:20 }}>
          Using Realm in React Native
        </Text>




        <TextInput style={{borderWidth:1,height:50, padding:15, margin:15}}
                placeholder="First Name"
                onChangeText={(text) => this.setState({firstName: text})}
                        value={this.state.firstName}
                />

        <TextInput style={{borderWidth:1,height:50, padding:15, margin:15}}
                placeholder="Last Name"
                onChangeText={(text) => this.setState({lastName: text})}
                        value={this.state.lastName}
                />
        <TextInput style={{borderWidth:1,height:50, padding:15, margin:15}}
                        placeholder="Password"
                        onChangeText={(text) => this.setState({password: text})}
                      secureTextEntry={true}
                            value={this.state.password}
                />



      <Button title={"Add one user"}
                onPress={this.handleAddOneUser} />


        <Text style={{fontSize:20}}>== Realm: Persistent Storage ==</Text>
         {userViewItems}

         <Button title={"Delete All"}
         onPress={this.handleDeleteAll} />

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
  },

});
