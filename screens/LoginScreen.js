import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import Button from 'react-native-button';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {Detail, ListFoods, AddFood} from './NameScreen';
import Login from '../components/profile/Login';
import LoginAdmin from '../components/profile/LoginAdmin';

export default class LoginScreen extends Component{
    render(){
        return(
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Drawer.Navigator style={{}}>
                        <Drawer.Screen name='Admin' component={LoginAdmin}></Drawer.Screen>
                        <Drawer.Screen name='Customer' component={Login}></Drawer.Screen>
                    </Drawer.Navigator>
            </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}