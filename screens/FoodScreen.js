import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {Detail, ListFoods, AddFood} from './NameScreen';
import AddNewFood from '../components/foods/AddFood';
import Index from '../components/foods/ListFoods';
import Header from '../components/foods/Header';
import ListCategories from '../components/categories/ListCategories';

export default class FoodScreen extends Component{
    render(){
        return(
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation}></Header>
                <View style={{flex: 70}}>
                    <Tab.Navigator style={{}}>
                        <Tab.Screen name={ListFoods} component={Index}></Tab.Screen>
                        <Tab.Screen name={AddFood} component={AddNewFood}></Tab.Screen>
                        <Tab.Screen name="Manage categories" component={ListCategories}></Tab.Screen>
                    </Tab.Navigator>
            </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}