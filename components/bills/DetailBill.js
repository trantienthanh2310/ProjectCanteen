import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import Button from 'react-native-button';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import {formatCurrency, style} from '../style';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const reference = database().ref('bills');
export default class DetailBill extends Component{
    constructor(props){
        super(props);
        this.state=({
            items: [],
            status: [],
            count: '',
        })
    }

    componentDidMount = ()=>{
        const {id} = this.props.route.params;
        reference.child(id).child('items').on('value', snapshot=>{
            const items = [];
            snapshot.forEach(element => {
                items.push({
                    id: element.toJSON().id,
                    name: element.toJSON().name,
                    note: element.toJSON().note,
                    price: element.toJSON().price,
                    quanlity: element.toJSON().quanlity,
                    img: element.toJSON().img,
                });
                this.setState({
                    items: items,
                })
            });
        })
        reference.child(id).child('status').on('value', snapshot=>{
            const items = [];{
                snapshot.forEach(element=>{
                    items.push({
                        status: element.toJSON().status,
                        time: element.toJSON().time,
                    })
                })
                this.setState({status: items});
            }
            this.setState({count: snapshot.numChildren()});
        });
        
    }
    

    updateStatus = ()=>{
        const {id} = this.props.route.params;
        const date = new Date();
        if(this.state.count>2){
            alert('This order has been paid');
        }else{
            reference.child(id).child('status').child(this.state.count.toString()).set({
                status: this.state.status, time: date.getHours() + ":" + +date.getMinutes() + ":" + date.getSeconds()
            }).then(this.props.navigation.dispatch(CommonActions.goBack())).then(alert('Update successfully!', 'OK'));
        }
    }

    render(){
        const {id, date, note, totalPrice, coupon, email} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 2, backgroundColor: 'grey',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{width: Dimensions.get('window').width-28,
                        backgroundColor: 'white',
                        height: 100,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                            <View style={{position: 'absolute', left: 10, top: 10}}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(CommonActions.goBack())}}>
                                    <Icon name="close" size={20} color="black"/>
                                </TouchableOpacity>
                            </View>
                            <Text style={style.labelDetailBill}>Hoá đơn</Text>
                            <Text style={{color: 'grey'}}>#{id}</Text>
                            <Text>{date}</Text>
                            <Text>{coupon==null?null:'Coupon: '+ coupon.toUpperCase()}</Text>
                            <Text>Email: {email}</Text>
                            
                        </View>
                </View>
                <View style={{flex: 8, backgroundColor: 'white'}}>
                    <FlatList data={this.state.items} renderItem={({item})=>{
                        return(<FlatListBill item={item}></FlatListBill>)
                    }}
                    keyExtractor={(item)=>item.id}></FlatList>
                <View style={{margin: 10}}>
                    <Text style={{color: "#2FD5CF", fontSize: 16}}>Note for canteen: {note}</Text>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={style.labelDetailBill}>Total: </Text>
                        <Text style={style.labelDetailBill}>{formatCurrency(totalPrice)}</Text>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Picker
                        selectedValue={this.state.status}
                        mode={'dialog'}
                        style={{height: 60, width: Dimensions.get('window').width-28}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({status: itemValue})
                        }>
                        <Picker.Item label="Đang chuẩn bị" value="Đang chuẩn bị" />
                        <Picker.Item label="Chờ lấy đơn" value="Chờ lấy đơn" />
                        <Picker.Item label="Đã thánh toán" value="Đã thanh toán" />
                    </Picker>
                </View>
                <View>
                    <FlatList data={this.state.status} renderItem={({item})=>{
                        return(<StatusBill item={item}></StatusBill>)
                    }}
                    keyExtractor={(item)=>item.time}></FlatList>
                </View>
                </View>
                <View style={{alignItems: 'center', backgroundColor: 'white'}}>
                    <View style={{width: Dimensions.get('window').width-28, backgroundColor: '#2FD5CF', alignItems: 'center',
                        height: 60, justifyContent: 'center', borderRadius: 10}}>
                        <Button style={style.button}
                            onPress={this.updateStatus}>Update status</Button>
                    </View>
                </View>
            </View>
        )
    }
}

export class StatusBill extends Component{
    render(){
        return(
            <View style={{margin: 10}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.item.status}</Text>
                <Text>{this.props.item.time}</Text>
            </View>
        )
    }
}

export class FlatListBill extends Component{
    render(){
        return(
            <View style={{marginTop: 10}}>
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width-28, alignItems: 'center', margin: 10}}>
                    <Image source={{uri: this.props.item.img}}
                        style={{height: 128, width: 128, borderRadius: 10}}
                    />
                    <View style={{marginHorizontal: 20, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.item.name}</Text>
                        <Text>Quanlity: {this.props.item.quanlity}</Text>
                        <Text>Price: {formatCurrency(this.props.item.price)}</Text>
                    </View>
                </View>
                <View style={{height: 1, backgroundColor: 'grey',
                    margin: 10}}></View>
            </View>
        )
    }
}