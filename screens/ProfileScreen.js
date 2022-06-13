import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions} from 'react-native';
import {style} from '../components/style';
import Profile from '../components/profile/index'
export default class ProfileScreen extends Component{
    render(){
        return(
            <Profile navigation={this.props.navigation}></Profile>
        )
    }
}