import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import Button from 'react-native-button';
import {Detail, ListFoods, AddFood} from './NameScreen';
import ListBills from '../components/bills/ListBills';
import Header from '../components/bills/Header';

export default class BillScreen extends Component{
    render(){
        return(
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Header navigation={this.props.navigation}></Header>
                <View style={{flex: 70}}>
                    <ListBills navigation={this.props.navigation} route={this.props.route}></ListBills>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}