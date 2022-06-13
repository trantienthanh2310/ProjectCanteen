import React, {Component} from 'react';
import {View, TextInput, FlatList, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import Button from 'react-native-button';
const reference = database().ref('bills');
import {style, formatCurrency} from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Detail, ListFoods, AddFood} from '../../screens/NameScreen';
export default class SearchBill extends Component{
    constructor(props){
        super(props);
        this.state=({
            keyword: '',
            bills: [],
        })
        this.array = [];
    }

    componentDidMount = ()=>{
        reference.on('value', snapshot=>{
            const items = [];
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    items.push({
                        id: element.toJSON().id,
                        date: element.toJSON().date,
                        note: element.toJSON().note,
                        totalPrice: element.toJSON().totalPrice,
                        username: element.toJSON().username,
                    });
                    this.setState({
                        bills: items
                    })
                    this.array = items;
                });
            }else{
                this.setState({
                    bills: [],
                })
            }
            
        })
    }

    searchBill(keyword) {
        const newData = this.array.filter(item => {
            const itemData = item.id.toLowerCase();
            const textData = keyword.toLowerCase();
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            bills: newData,
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
                        placeholder={'Enter ID: '}
                        keyboardType={'number-pad'}
                        autoFocus={true} onChangeText={(text)=>{this.searchBill(text)}}></TextInput>
                </View>
               <FlatList
                    data={this.state.bills}
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
                        <View style={{backgroundColor: '#2FD5CF', width: 300, height: 60, borderRadius: 10}}>
                            <View style={{backgroundColor: 'white', width: 300, height: 60,
                                marginLeft: 10,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: 'grey'}}>#{this.props.item.id}</Text> 
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{fontWeight: 'bold'}}>Hoá đơn</Text>
                                        <Text style={{fontSize: 10}}>{this.props.item.date}</Text>
                                    </View>
                                </View>
                        </View>
                        <TouchableOpacity style={{backgroundColor: 'white', height: 60, width: 60,
                         marginLeft: 10,justifyContent: 'center', borderRadius: 10}} onPress={()=>{this.props.navigation.navigate('BillDetail', {id: this.props.item.id,
                            date: this.props.item.date, note: this.props.item.note, totalPrice: this.props.item.totalPrice,
                            username: this.props.item.username})}}>
                            <Text style={{ textAlign: 'center', color: '#2FD5CF', fontWeight: 'bold'}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}