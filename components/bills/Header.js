import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
// import {Detail, ListFoods, AddFood} from '../';

export default class Header extends Component{
    render(){
        return(
            <View style={{flex: 10}}>
                <View style={{flex: 12, backgroundColor: 'white'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                        <Text style={{fontSize: 16,
                            fontWeight: "bold"}}>Invoice Management</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={{width: Dimensions.get('window').width-28,
                            backgroundColor: '#E0E2E3', borderRadius: 20, height: 40,
                            textAlign: 'center',
                            fontSize: 11}}
                            placeholder={'Enter ID: '}
                            onFocus={()=>{this.props.navigation.navigate('SearchBill')}}></TextInput>
                    </View>
                </View>
            </View>
        )

    }
}