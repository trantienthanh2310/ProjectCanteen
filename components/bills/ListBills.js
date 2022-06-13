import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {style} from '../style';
import database from '@react-native-firebase/database';
const reference = database().ref('bills');


export default class ListBill extends Component{
    constructor(props){
        super(props);
        this.state=({
            bills: [],
        })
    }
    componentDidMount = ()=>{
        reference.on('value', snapshot=>{
            const items = [];
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    items.push({
                        id: element.toJSON().id,
                        date: element.toJSON().date,
                        note: element.toJSON().note,
                        totalPrice: element.toJSON().totalPrice,
                        couponIsUsed: element.toJSON().couponIsUsed,
                        email: element.toJSON().email,
                    });
                    this.setState({
                        bills: items
                    })
                });
            }else{
                this.setState({
                    bills: [],
                })
            }
            
        })
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <FlatList data={this.state.bills} renderItem={({item})=>{
                    return(
                        <FlatListBills item={item} navigation={this.props.navigation}></FlatListBills>
                    )
                }}></FlatList>
            </View>
        )
    }
}

export class FlatListBills extends Component{
    render(){
        return(
            <View style={{flex: 70}}>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 20}}>
                        <View style={{backgroundColor: '#2FD5CF', width: 300, height: 60, borderRadius: 10}}>
                            <View style={{backgroundColor: 'white', width: 300, height: 60,
                                marginLeft: 10,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: 'grey', marginLeft: 20}}>#{this.props.item.id}</Text> 
                                    <View style={{marginLeft: 20}}>
                                        <Text style={{fontWeight: 'bold'}}>Hoá đơn</Text>
                                        <View style={{width: 200}}>
                                            <Text style={{fontSize: 14}}>{this.props.item.date}</Text>
                                        </View>
                                    </View>
                                </View>
                        </View>

                        <View style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}}>
                            <Button style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}}
                                onPress={()=>{this.props.navigation.navigate('BillDetail', {id: this.props.item.id,
                                    date: this.props.item.date, note: this.props.item.note, totalPrice: this.props.item.totalPrice,
                                    coupon: this.props.item.couponIsUsed, email: this.props.item.email})}}>Edit</Button>
                        </View>
                    </View>
                </View>
        )
    }
}