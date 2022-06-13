import React, {Component} from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableHighlight, TextInput} from 'react-native';
import Button from 'react-native-button';
import Header from '../foods/Header';
import database from '@react-native-firebase/database';
import {style, formatCurrency} from '../style';

const refernce = database().ref('cart');
export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state=({
            cart: [],
            isLoading: false
        })
    }
    componentDidMount =()=>{
        refernce.child(this.props.uid).on('value', snapshot=>{
            const items= [];
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    items.push({
                        id: element.toJSON().id,
                        name: element.toJSON().name,
                        price: element.toJSON().price,
                        quanlity: element.toJSON().quanlity,
                    })
                    this.setState({
                        cart: items,
                    })
                });
            }else{
                this.setState({
                    cart: [],
                })
            }
            
        })
    }

    
    sumQuanlity = (obj)=>{
        var sum = 0;
        for (var element in obj){
            sum+= obj[element];
        }
        return sum;
    }
    
    totalPrice = (obj, items)=>{
        var total = 0;
        for(var i=0;i<obj.length;i++){
            {
                total += (obj[i]*items[i]);
            }
        }
        return total;
    }
    render(){
        return(
            <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 40,
                    padding: 10,
                    backgroundColor: '#2FD5CF',
                    borderRadius: 10,
                    width: Dimensions.get('window').width-28}}>
                    <Text style={style.labelAddToCart}> {this.sumQuanlity(this.state.cart.map(value=>(value.quanlity)))} items</Text>
                    <Button style={style.labelAddToCart}
                        onPress={()=>{this.props.navigation.navigate("DetailCart", {uid: this.props.uid, email: this.props.email})}}>CART</Button>
                    <Text style={style.labelAddToCart}>{formatCurrency(this.totalPrice(this.state.cart.map(value=>value.price), this.state.cart.map(value=>value.quanlity)))} VND</Text>
                </View>
            </View>
           
        )
    }
}
