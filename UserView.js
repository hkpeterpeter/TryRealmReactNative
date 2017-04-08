import React, { Component } from 'react';

import {
  StyleSheet, Text, View,
} from 'react-native';

import realm from './realm';

export default class UserView extends Component {

  constructor(props) {
    super(props);
  }

  get firstName() {return this.props.user.firstName; }
  get lastName() {return this.props.user.lastName; }
  get password() {return this.props.user.password; }

  render() {
    return (

          <View>
            <Text>{this.firstName} {this.lastName} (PW: {this.password})</Text>
          </View>

    );
  }

}
