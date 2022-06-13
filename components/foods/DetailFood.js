import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, Alert} from 'react-native';
import Button from 'react-native-button';
import {style, formatCurrency} from '../style';
import {CommonActions} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {Update} from '../../screens/NameScreen';
const reference = database().ref('/foods/');
export default class DetailFood extends Component{

    
    render(){
        const {id, price, name, category, img} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 3, backgroundColor: 'red', alignItems: 'center'}}>
                    <Image source={{uri: img}}
                        style={{width: Dimensions.get('window').width, height: 250}}
                    />
                    <View style={{width: 200, height: 85, backgroundColor: 'white', position: 'absolute',
                        borderRadius: 10, top: 180, borderWidth: 0.5, justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}>{name}</Text>
                    </View>
                </View>
                <View style={{flex: 7, backgroundColor: 'white',marginTop: 100}}>
                        <View style={style.container}>
                            <Text style={style.textLabel}>ID: </Text>
                            <Text style={style.textLabel}>{id}</Text>
                        </View>

                        <View style={style.container}>
                            <Text style={style.textLabel}>Price: </Text>
                            <Text style={style.textLabel}>{formatCurrency(price)}</Text>
                        </View>

                        <View style={style.container}>
                            <Text style={style.textLabel}>Name: </Text>
                            <Text style={style.textLabel}>{name}</Text>
                        </View>

                        <View style={style.container}>
                            <Text style={style.textLabel}>Category: </Text>
                            <Text style={style.textLabel}>{category}</Text>
                    </View>      
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, alignItems: 'center', backgroundColor: '#2FD5CF'}}>
                    <Button style={style.button}
                        onPress={()=>{this.props.navigation.navigate(Update, {id: id, price: price, name: name, category: category, img: img})}}>
                        Update
                    </Button>
                    <Button style={style.button} onPress={()=>{
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text: 'No', onPress: ()=>{}, style:'cancel'},
                                {text: 'Yes', onPress: ()=>{reference.child(id).remove().then(this.props.navigation.dispatch(CommonActions.goBack()))}},
                                // {text: 'Yes', onPress: ()=>{reference.child(id).remove().then(console.log('id: ', id))}},
                            ],
                            {cancelable: true}
                        );
                    }}>
                        Delete
                    </Button>
                </View>  
            </View>
        )
    }
}