import React, {Component} from 'react';
import {View, TextInput, FlatList, Text, Image, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
const refernce = database().ref('foods');
import {style, formatCurrency} from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class SearchFoods extends Component{
    constructor(props){
        super(props);
        this.state=({
            keyword: '',
            foods: [],
        })
        this.array = [];
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
                        category: element.toJSON().category,
                    })
                    this.setState({
                        foods: items,
                        isLoading: true
                    })
                    this.array = items;
                });
            }else{
                this.setState({
                    foods: [],
                })
            }
        })
    }

    searchFood(keyword) {
        const newData = this.array.filter(item => {
            const itemData = item.name.toLowerCase();
            const textData = keyword.toLowerCase();
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            foods: newData,
            keyword: keyword
        })
    }

    render(){
        const {uid} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput style={{width: Dimensions.get('window').width-28,
                            backgroundColor: '#E0E2E3', borderRadius: 20, height: 40,
                            textAlign: 'center',
                            fontSize: 11, 
                            margin: 10}}
                        placeholder={'Find food here'}
                        autoFocus={true} onChangeText={(text)=>{this.searchFood(text)}}></TextInput>
                </View>
               <FlatList
                    data={this.state.foods}
                    renderItem={({item}) => {
                        return (
                            <ListSearch item={item} navigation={this.props.navigation} uid={uid}></ListSearch>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
}

export class ListSearch extends Component{
    render(){
        return(
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddToCart', {name: this.props.item.name, price: this.props.item.price,
                    img: this.props.item.img, id: this.props.item.id, uid:this.props.uid})}}>
                    <View style={{flex: 1, flexDirection: 'row', width: Dimensions.get('window').width, marginHorizontal: 10}}>
                        <Image source={{uri: this.props.item.img}} style={{width: 100, height: 100}}/>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                                <Icon name="turned-in" size={30} color="#2FD5CF"/>
                                <Text style={{fontSize:20,marginLeft: 10}}>{this.props.item.name}</Text>
                            </View>
                            <Text style={{padding: 10, fontSize:14}}>{formatCurrency(this.props.item.price)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                    <View style={{height: 0.5, backgroundColor: 'grey', marginVertical: 10}}></View>
                </View>
        )
    }
}