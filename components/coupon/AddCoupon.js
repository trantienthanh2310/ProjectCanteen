import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Button from 'react-native-button';
import database from '@react-native-firebase/database';
import {CommonActions} from '@react-navigation/native';
const reference = database().ref('coupons');
export default class AddCoupon extends Component{
    constructor(props){
        super(props);
        this.state=({
            coupon: '',
            description: '',
            sale: '',
        })
    }

    addCoupon = ()=>{
        if(this.state.coupon == '' || this.state.description == '' || this.state.sale == ''){
            alert('@Require: text field not null!');
        }else{
            reference.child(this.state.coupon.toLowerCase()).set({coupon: this.state.coupon.toLowerCase(), description: this.state.description, sale: this.state.sale})
            .then(
                alert('Đã thêm coupon!', 'OK')
            ).then(this.props.navigation.dispatch(CommonActions.goBack()));
        }
        
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <TextInput style={style.styleInput} placeholder={"Coupon"} 
                    onChangeText={(text)=>{this.setState(()=>{
                        return({coupon: text})
                    })}}></TextInput>
                <TextInput style={style.styleInput} placeholder={"Description"} multiline={true}
                    onChangeText={(text)=>{this.setState(()=>{
                        return({description: text})
                    })}}></TextInput>
                
                <TextInput style={style.styleInput} placeholder={"Discount"} multiline={true}
                    onChangeText={(text)=>{this.setState(()=>{
                        return({sale: text})
                    })}}></TextInput>

                <Button style={style.styleButton}
                    onPress={this.addCoupon}>Create coupon</Button>
            </View>
        )
    }
}

const style = StyleSheet.create({
    styleInput:{
        borderBottomWidth: 1,
        width: Dimensions.get('window').width-28,
        margin: 10
    },

    styleButton:{
        backgroundColor: '#2FD5CF',
        width: 120,
        height: 60,
        padding: 10,
        borderRadius: 10,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})