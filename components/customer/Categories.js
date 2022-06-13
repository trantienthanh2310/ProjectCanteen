import React, {Component} from 'react';
import {View, Text, Image, FlatList, Dimensions} from 'react-native';
import flatListData from './data';
import database from '@react-native-firebase/database';
import Button from 'react-native-button';
const reference = database().ref('categories');
export default class Categories extends Component{
    constructor(props){
        super(props);
        this.state=({
            categories: [],
        })
    }
    componentDidMount =()=>{
        reference.on('value', snapshot=>{
            const items = [];
            snapshot.forEach(element => {
                items.push({
                    name: element.toJSON().name,
                    img: element.toJSON().img,
                });
                this.setState({
                    categories: items
                })
            });
        })
    }
    render(){
        return(
            <View style={{flex: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <View style={{width: Dimensions.get('window').width-28,
                    padding: 10, height: 190,
                    backgroundColor: 'white', margin: 10}}>
                    <FlatList numColumns={4} data={this.state.categories} renderItem={({item})=>{
                        return(
                            <FlatListItem item={item}></FlatListItem>
                        )
                    }}
                    keyExtractor={(item)=>item.img}></FlatList>
                </View>
            </View>   
        )
    }
}

export class FlatListItem extends Component{
    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', borderWidth: .5}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: this.props.item.img}} style={{width: 64, height: 64}}/>
                    <Text>{this.props.item.name}</Text>
                </View>
            </View>
        )
    }
}