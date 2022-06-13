import React, {Component} from 'react';
import {View, Text, FlatList, Alert, TextInput, TouchableHighlight, Image} from 'react-native';
import Button from 'react-native-button';
import database from '@react-native-firebase/database';
import {formatCurrency, style} from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const refernce = database().ref('cart');
const cartToBill = database().ref('bills');
const coupon = database().ref('coupons');
export default class DetailCart extends Component{
    constructor(props){
        super(props);
        this.state=({
            note: '',
            cart: [],
            count: '',
            coupon: '',
            sale: '',
            coupons: [],
        });
    }

    componentDidMount =()=>{
        const {uid} = this.props.route.params;
        refernce.child(uid).on('value', snapshot=>{
            const items= [];
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    items.push({
                        id: element.toJSON().id,
                        name: element.toJSON().name,
                        price: element.toJSON().price,
                        quanlity: element.toJSON().quanlity,
                        note: element.toJSON().note,
                        img: element.toJSON().img,
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
        cartToBill.on('value', snapshot=>{
            this.setState({count: snapshot.numChildren()});
        });
        coupon.on('value', snapshot=>{
            const items=[];
            snapshot.forEach(element=>{
                items.push({
                    coupon: element.toJSON().coupon,
                    description: element.toJSON().description,
                });
            })
            this.setState({coupons: items})
        })
    }

    componentWillUnmount = ()=>{

    }

    order = async (totalPrice)=>{
        const {uid, email} = this.props.route.params;
        const date = new Date();
        const id = 'CT' + date.getDate().toString() + (date.getMonth()+1) + date.getFullYear().toString() + '0' + this.state.count;
        await cartToBill.child(id).set({id: id, date: date.toString(), totalPrice: totalPrice, items: this.state.cart, note: this.state.note,
            email: email, uid: uid, couponIsUsed: this.state.coupon});
        await cartToBill.child(id).child('status').child('0').set({status: 'Đang chuẩn bị', time: date.getHours() + ":" + +date.getMinutes() + ":" + date.getSeconds()});
        await refernce.remove().then(
            this.props.navigation.navigate('Home')
        ).then(
            alert('Order successfully! Your order ID: #' + id, 'OK')
        );
    }

    applyCoupon = ()=>{
        coupon.child(this.state.coupon).on('value', snapshot=>{
            if(snapshot.exists()){
                this.setState({sale: snapshot.toJSON().sale});
            }else{
                alert('Invalid or expired code', 'OK');
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
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home')}}>
                    <Icon style={{padding: 10}} name="close" size={20} color="black"/>
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', margin: 30}}>YOUR ORDER</Text>
                </View>
                <FlatList data={this.state.cart} renderItem={({item})=>{
                    return(
                        <ListItem item={item} route={this.props.route}></ListItem>
                    )
                }}
                keyExtractor={(item)=>item.id}></FlatList>
                <View style={{flex: 10, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Subtotal ({this.sumQuanlity(this.state.cart.map(value=>value.quanlity))} items)</Text>
                    <Text>{formatCurrency(this.totalPrice(this.state.cart.map(value=>value.price), this.state.cart.map(value=>value.quanlity)))}</Text>
                </View>
                <View style={{flex: 10, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Discount: </Text>
                    <Text>{formatCurrency(-this.state.sale)}</Text>
                </View>
                <View style={{height: 1, backgroundColor: '#f0f8ff', marginHorizontal: 10}}></View>
                <TextInput style={{marginHorizontal: 10}} placeholder={'Any note for canteen?'}
                    multiline={true}
                    onChangeText={(text)=>{this.setState(()=>{
                        return({note: text})
                    })}}></TextInput>
                <View style={{flexDirection: 'row'}}>
                    <TextInput style={{marginHorizontal: 10}} placeholder={'Enter coupon'}
                        onChangeText={(text)=>{this.setState(()=>{return({coupon: text.toLowerCase()})})}}></TextInput>
                    <Button style={{color: "#2FD5CF", fontWeight: 'bold', fontSize: 14, marginTop: 15}}
                        onPress={this.applyCoupon}>Use</Button>
                </View>
                <FlatList backgroundColor={'#f0f8ff'} horizontal={true} data={this.state.coupons} renderItem={({item})=>{
                    return(
                        <ListCoupons item={item}></ListCoupons>
                    )
                }}
                keyExtractor={(item)=>item.coupon}></FlatList>
                <View style={{flex: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <View>
                        <Text>Total</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{
                            formatCurrency(this.totalPrice(this.state.cart.map(value=>value.price), this.state.cart.map(value=>value.quanlity))-this.state.sale)
                        }</Text>
                    </View>
                        <Button style={style.buttonOrder}
                            onPress={()=>{this.order(this.totalPrice(this.state.cart.map(value=>value.price), this.state.cart.map(value=>value.quanlity))-this.state.sale)}}>ORDER</Button>
                    </View>
            </View>
        )
    }
}

export class ListItem extends Component{
    render(){
        const {uid} = this.props.route.params;
        return(
            <View style={{backgroundColor: 'white', }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#778899', fontSize: 16}}>{this.props.item.quanlity}x</Text>
                        <Text style={{marginLeft: 20, fontSize: 16}}>{this.props.item.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text>{formatCurrency(this.props.item.price)}</Text>
                        <TouchableOpacity onPress={()=>{refernce.child(uid).child(this.props.item.id).remove()}}>
                            <Icon name="close" size={20} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 1, backgroundColor: '#f0f8ff', marginHorizontal: 10}}></View>
            </View>
        )
    }
}

export class ListCoupons extends Component{
    render(){
        return(
            <View style={{flex: 1}}>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 20}}>
                        <View style={{backgroundColor: '#2FD5CF', width: 280, height: 60, borderRadius: 10}}>
                            <View style={{backgroundColor: 'white', width: 270, height: 60,
                                marginLeft: 10,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'}}>
                                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/mobileproject-47185.appspot.com/o/logo.png?alt=media&token=ba007594-5510-4612-b8d4-a80abe9db7e5'}}
                                        style={{width: 75, height: 50}}
                                    />
                                    <View style={{marginLeft: 20}}>
                                        <Text style={{fontSize: 16}}>{this.props.item.description}</Text>
                                        <Text style={{fontSize: 12}}>#{this.props.item.coupon}</Text>
                                    </View>
                                </View>
                        </View>                   
                    </View>
                </View>
        )
    }
}