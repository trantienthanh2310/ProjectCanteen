import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {style} from '../style';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class ProfileCustomer extends Component{
    render(){
        return(
            <View style={{flex: 1, width: Dimensions.get('window').width}}>
                <View style={{flex: 15, backgroundColor: '#2FD5CF'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Home', {uid: this.props.user.uid, 
            email: this.props.user.email})}}>
                    <View style={{padding: 10}}>
                        <Icon name="close" size={20} color="white"/>
                    </View>
                </TouchableOpacity>
                    <View style={{flexDirection: "row", justifyContent: "space-between",
                        margin: 20}}>
                        <Text style={style.textHeader}>{this.props.user.email}</Text>
                        <Icon name="keyboard-arrow-right" size={20} color="white"/>
                    </View>
                </View>
                <View style={{flex: 80, backgroundColor: 'white', marginTop: 20}}>
                    <TouchableOpacity>
                        <View style={style.viewListItem_Profile}>
                            <Text style={style.textListItem_Profile}>Order history</Text>
                            <Icon name="keyboard-arrow-right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity>
                        <View style={style.viewListItem_Profile}>
                            <Text style={style.textListItem_Profile}>Help center</Text>
                            <Icon name="keyboard-arrow-right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}