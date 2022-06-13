import React, {Component} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import database from '@react-native-firebase/database';
import Button from 'react-native-button'

const reference = database().ref('coupons');
export default class ListCoupons extends Component{
    constructor(props){
        super(props);
        this.state=({
            coupons: [],
        })
    }

    componentDidMount = ()=>{
        reference.on('value', snapshot=>{
            const items = [];
            snapshot.forEach((element)=>{
                items.push({
                    coupon: element.toJSON().coupon,
                    description: element.toJSON().description,
                })
            });
            this.setState({
                coupons: items,
            })
        })
    }

    render(){
        const navigation = this.props.navigation;
        return(
            <FlatList data={this.state.coupons} renderItem={({item})=>{
                return(
                    <FlatListItem item={item} navigation = {navigation} ></FlatListItem>
                )
            }}
            keyExtractor={(item)=>item.coupon}></FlatList>
        )
    }
}

export class FlatListItem extends Component{
    render(){
        return(
            <View style={{flex: 70}}>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', margin: 20}}>
                        <View style={{backgroundColor: '#2FD5CF', width: 280, height: 60, borderRadius: 10}}>
                            <View style={{backgroundColor: 'white', width: 270, height: 60,
                                marginLeft: 10,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'}}>         
                                    <View style={{marginLeft: 20}}>
                                        <Text style={{fontSize: 20}}>{this.props.item.description}</Text>
                                        <Text style={{fontSize: 16}}>#{this.props.item.coupon}</Text>
                                    </View>
                                </View>
                        </View>

                        <View style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}}>
                            <Button style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}} onPress={()=>{
                                Alert.alert(
                                    'Alert',
                                    'Are you sure you want to delete?',
                                    [
                                        {text: 'No', onPress: ()=>{}, style:'cancel'},
                                        {text: 'Yes', onPress: ()=>{reference.child(this.props.item.coupon).remove()}},
                                        // {text: 'Yes', onPress: ()=>{reference.child(id).remove().then(console.log('id: ', id))}},
                                    ],
                                    {cancelable: true}
                                );
                            }}>Delete</Button>
                        </View>
                    </View>
                </View>
        )
    }
}