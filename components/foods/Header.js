import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
// import {Detail, ListFoods, AddFood} from '../';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default class Header extends Component{
    render(){
        return(
            <View style={{flex: 10}}>
                <View style={{flex: 12, backgroundColor: 'white'}}>
                    <TouchableOpacity style={{position: 'absolute', margin: 10}} 
                        onPress={()=>{this.props.navigation.navigate('Login')}}>
                        <Icon name="close" size={20} color="black"/>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 10}}>
                        <Text style={{fontSize: 16,
                            fontWeight: "bold"}}>Manage foods</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TextInput style={{width: Dimensions.get('window').width-28,
                            backgroundColor: '#E0E2E3', borderRadius: 20, height: 40,
                            textAlign: 'center',
                            fontSize: 14}}
                            placeholder={'Find food here!'}
                            onFocus={()=>{this.props.navigation.navigate('AdminSearch')}}
                           ></TextInput>
                    </View>
                </View>
            </View>
        )

    }
}