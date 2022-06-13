import React, {Component} from 'react';
import {View, Text, Image, FlatList, Dimensions, TouchableHighlight} from 'react-native';
import Header from '../foods/Header';
import database from '@react-native-firebase/database';
import {style, formatCurrency} from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const refernce = database().ref('foods');
export default class ListFoods extends Component{
    constructor(props){
        super(props);
        this.state=({
            foods: [],
            isLoading: false,
        })
    }

    componentDidMount = ()=>{
        refernce.on('value', snapshot=>{
            const items = [];
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    items.push({
                        id: element.toJSON().id,
                        name: element.toJSON().name,
                        price: element.toJSON().price,
                        img: element.toJSON().img,
                    })
                    this.setState({
                        foods: items,
                        isLoading: true
                    })
                });
            }else{
                this.setState({
                    foods: [],
                })
            }
        })
    }

    render(){
        return(
            <View style={{flex: 60, backgroundColor: 'white', padding: 10, marginTop: 10}}>   
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Hot deals around you</Text>
                <FlatList data={this.state.foods} renderItem={({item})=>{
                    return(
                        <DataFoods item={item} navigation={this.props.navigation} uid={this.props.uid}></DataFoods>
                    )
                }}></FlatList>
            </View>
        )
    }
}

export class DataFoods extends Component{
    render(){
        return(
                <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddToCart', {name: this.props.item.name, price: this.props.item.price,
                    img: this.props.item.img, id: this.props.item.id, uid:this.props.uid})}}
                    underlayColor={'grey'}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: this.props.item.img}} style={{width: 128, height: 128}}/>
                        <View style={{marginLeft: 30}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{this.props.item.name}</Text>
                            <Text>{formatCurrency(this.props.item.price)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                    <View style={{
                            height: 1,
                            backgroundColor:'grey',
                            marginTop: 10                            
                    }}></View>
                </View>
        )
    }
}