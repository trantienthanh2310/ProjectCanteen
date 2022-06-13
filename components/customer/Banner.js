import React, {Component} from 'react';
import {View, Text, Image, FlatList, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import flatListData from './data';

export default class Banner extends Component{
    render(){
        return(
            <View style={{backgroundColor: 'white', marginTop: 20}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', paddingLeft: 10}}>Sài Gòn, hôm nay ăn gì</Text>
                <FlatList horizontal={true} data={flatListData} renderItem={({item})=>{
                    return(
                        <ListBanner item={item}></ListBanner>
                    )
                }}></FlatList>   
            </View>
        )
    }
}

export class ListBanner extends Component{
    render(){
        return(
            <View style={{flex: 1, margin: 10}}>
                <Image source={{uri: this.props.item.img}} style={{width: 300, height: 150}}/>
            </View>
        )
    }
}