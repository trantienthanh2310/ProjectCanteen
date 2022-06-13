import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Header extends Component{
    render(){
        return(
            <View style={{flex: 25}}>
                <View style={{flex: 12, backgroundColor: 'white'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
                        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
                            <Icon name="view-headline" size={30} color="black"/>
                        </View>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={{width: Dimensions.get('window').width-28,
                            backgroundColor: '#E0E2E3', borderRadius: 20, height: 40,
                            textAlign: 'center',
                            fontSize: 11, 
                            margin: 10}}
                            placeholder={'Find food here!'}
                            onFocus={()=>{this.props.navigation.navigate('Search', {uid: this.props.uid})}}></TextInput>
                    </View>
                </View>
            </View>
        )

    }
}