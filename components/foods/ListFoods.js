import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import {style, formatCurrency} from '../style';
import database from '@react-native-firebase/database';
import {Detail, ListFoods, AddFood} from '../../screens/NameScreen';
const reference = database().ref('foods');
export default class Index extends Component{
    constructor(props){
        super(props);
        this.state=({
            food: [],
        })
    }

    componentDidMount = ()=>{
        reference.on('value', snapshot=>{
            const items = [];
            snapshot.forEach((element)=>{
                items.push({
                    id: element.toJSON().id,
                    price: element.toJSON().price,
                    name: element.toJSON().name,
                    category: element.toJSON().category,
                    img: element.toJSON().img,
                })
            });
            this.setState({
                food: items,
            })
        })
    }

    render(){
        const navigation = this.props.navigation;
        return(
            <FlatList data={this.state.food} renderItem={({item})=>{
                return(
                    <FlatListItem item={item} navigation={navigation}></FlatListItem>
                )
            }}
            keyExtractor={(item)=>item.id}></FlatList>
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
                                flexDirection:'row',
                                justifyContent: 'center'}}>
                                    <Image source={{uri: this.props.item.img}}
                                        style={{margin:5,width: 75, height: 50, backgroundColor:'green'}}
                                    />
                                    <View style={{marginLeft: 10,width:160}}>
                                        <Text style={{fontSize: 18,textAlign:'center'}}>{this.props.item.name}</Text>
                                        <Text style={{fontSize: 18,textAlign:'center'}}>Giá: {formatCurrency(this.props.item.price)}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableOpacity style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}} onPress={()=>{this.props.navigation.navigate(Detail, 
                            {id: this.props.item.id, price: this.props.item.price, name: this.props.item.name,
                            category: this.props.item.category, img: this.props.item.img})}}>
                            <Text style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}