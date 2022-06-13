import React, {Component} from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableHighlight, TextInput} from 'react-native';
import Button from 'react-native-button';
import Header from '../foods/Header';
import database from '@react-native-firebase/database';
import {style, formatCurrency} from '../style';

const refernce = database().ref('cart');
export default class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state=({
            count: 1,
            note: '',
            items: [],
        });
    }

    addToCart = (id, name, price, img, uid)=>{
        const quanlity = this.state.count;
        refernce.child(uid).child(id).set({name: name, price: price, id: id, quanlity: quanlity, note: this.state.note, img: img,
        });
    }

    componentDidMount =()=>{
        const {uid} = this.props.route.params;
        refernce.child(uid).on('value', snapshot=>{
            const items= [];
            snapshot.forEach(element => {
                items.push({
                    id: element.toJSON().id,
                    name: element.toJSON().name,
                    price: element.toJSON().price,
                    quanlity: +element.toJSON().quanlity,
                })
                this.setState({
                    items: items,
                })
            });
        });
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
        const {name, price, img, id, uid} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Image source={{uri: img}}
                        style={{width: Dimensions.get('window').width, height: 200}}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin:10}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{name}</Text>
                        <Text>{formatCurrency(price)}</Text>
                    </View>
                    <Text style={{margin: 10}}>This is description</Text>
                    <TextInput style={{color: "#2FD5CF", margin: 10}} placeholder={"+ Note to Canteen"}
                        placeholderTextColor="#2FD5CF"
                        multiline={true}
                        onChangeText={(text)=>{this.setState(()=>{
                            return({note: text})
                        })}}
                        ></TextInput>

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Button style={style.buttonAddQuanlityCustomer}
                            onPress={()=>{this.state.count==1?this.setState({count: 1}):this.setState({count: this.state.count-1})}}> - </Button>
                        <Text style={{fontSize: 20}}>{this.state.count}</Text>
                        <Button style={style.buttonAddQuanlityCustomer}
                            onPress={()=>{this.setState({count: this.state.count+1})}}
                            > + </Button>
                    </View>
                </View>
                <View style={{justifyContent: 'flex-end', backgroundColor: '#2FD5CF', margin: 10,borderRadius: 10}}>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', height: 50,
                        padding: 10}}>
                        <Text style={style.labelAddToCart}>{this.sumQuanlity(this.state.items.map(value=>(value.quanlity)))} items</Text>
                        <Button style={style.labelAddToCart}
                            onPress={()=>{this.addToCart(id, name, price, img, uid)}}>ADD</Button>
                        <Text style={style.labelAddToCart}>{formatCurrency(this.totalPrice(this.state.items.map(value=>value.price), this.state.items.map(value=>value.quanlity)))}VND</Text>
                    </View>
                </View>
            </View>
        )
    }
}
