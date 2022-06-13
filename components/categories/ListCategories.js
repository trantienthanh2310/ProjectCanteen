import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';

const ref = database().ref('categories');
export default class ListCategories extends Component{
    constructor(props){
        super(props);
        this.state=({
            categories: [],
        })
    }
    componentDidMount = ()=>{
        ref.on('value', snapshot=>{
            const items = [];
            snapshot.forEach(element => {
                items.push({
                    id: element.toJSON().id,
                    name: element.toJSON().name,
                    img: element.toJSON().img,
                })
                this.setState({
                    categories: items,
                })
            });
        })
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{position: 'absolute', bottom: 20, right: 20, backgroundColor: '#2FD5CF', borderRadius: 30, width: 32, height: 32, zIndex: 1}}>
                    <Button style={{color: 'white', fontWeight: 'bold', fontSize: 20}} 
                        onPress={()=>{this.props.navigation.navigate('AddCategory')}}>+</Button>
                </View>
                <FlatList data={this.state.categories} renderItem={({item})=>{
                    return(
                        <ItemCategories item={item} navigation={this.props.navigation}></ItemCategories>
                    )
                }}
                keyExtractor={(item)=>item.id}></FlatList>
            </View>
        )
    }
}

export class ItemCategories extends Component{
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
                                    <Image source={{uri: this.props.item.img}}
                                        style={{width: 75, height: 50}}
                                    />
                                    <View style={{marginLeft: 20,width:160}}>
                                        <Text style={{fontSize: 18,textAlign:'center'}}>{this.props.item.name}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableOpacity style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}} onPress={()=>{this.props.navigation.navigate('UpdateCategory', 
                         {name: this.props.item.name,
                         img: this.props.item.img,
                         id: this.props.item.id})}}>
                             <Text style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}