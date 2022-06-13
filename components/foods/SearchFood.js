import React, {Component} from 'react';
import {View, TextInput, FlatList, Text, Image, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import Button from 'react-native-button';
const refernce = database().ref('foods');
import {style, formatCurrency} from '../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Detail, ListFoods, AddFood} from '../../screens/NameScreen';
export default class SearchFood extends Component{
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
        
        return(
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <TextInput style={{width: Dimensions.get('window').width-28,
                            backgroundColor: '#E0E2E3', borderRadius: 20, height: 40,
                            textAlign: 'center',
                            fontSize: 11, 
                            margin: 10}}
                        placeholder={'Find food here!'}
                        autoFocus={true} onChangeText={(text)=>{this.searchFood(text)}}></TextInput>
                </View>
               <FlatList
                    data={this.state.foods}
                    renderItem={({item}) => {
                        return (
                            <ListSearch item={item} navigation={this.props.navigation}></ListSearch>
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
                                    <View style={{marginLeft: 20, width:160}}>
                                        <Text style={{fontSize: 18, textAlign:'center'}}>{this.props.item.name}</Text>
                                        <Text style={{fontSize: 18, textAlign:'center'}}>Giá: {formatCurrency(this.props.item.price)}</Text>
                                    </View>
                                </View>
                        </View>

                        <View style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}}>
                            <Button style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}} onPress={()=>{this.props.navigation.navigate(Detail, 
                                {id: this.props.item.id, price: this.props.item.price, name: this.props.item.name,
                                category: this.props.item.category, img: this.props.item.img})}}>Edit</Button>
                        </View>
                    </View>
                </View>
        )
    }
}