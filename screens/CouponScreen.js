import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {listCoupons, addCoupon} from './NameScreen';
import AddNewFood from '../components/foods/AddFood';
import Header from '../components/foods/Header';
import ListCoupons from '../components/coupon/ListCoupons';
import AddCoupon from '../components/coupon/AddCoupon';

export default class CouponScreen extends Component{
    render(){
        return(
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation}></Header>
                <View style={{flex: 70}}>
                    <Tab.Navigator style={{}}>
                        <Tab.Screen name={listCoupons} component={ListCoupons}></Tab.Screen>
                        <Tab.Screen name={addCoupon} component={AddCoupon}></Tab.Screen>
                    </Tab.Navigator>
            </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}