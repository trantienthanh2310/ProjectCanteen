import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions} from 'react-native';
import Button from 'react-native-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {style} from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class Profile extends Component{
    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 15, backgroundColor: '#2FD5CF'}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between",
                        margin: 20, paddingTop: 40}}>
                        <Text style={style.textHeader}>{this.props.email}</Text>
                        <Icon name="keyboard-arrow-right" size={20} color="white"/>
                    </View>
                </View>
                <View style={{flex: 80, backgroundColor: 'white', marginTop: 20}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Manage")}}>
                        <View style={style.viewListItem_Profile}>
                            <Text style={style.textListItem_Profile}>List of dishes</Text>
                            <Icon name="keyboard-arrow-right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Bill")}}>
                        <View style={style.viewListItem_Profile}>
                            <Text style={style.textListItem_Profile}>Invoice list</Text>
                            <Icon name="keyboard-arrow-right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Coupon")}}>
                        <View style={style.viewListItem_Profile}>
                            <Text style={style.textListItem_Profile}>Coupons</Text>
                            <Icon name="keyboard-arrow-right" size={20} color="black"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'white', paddingBottom: 20}}>
                    <TouchableOpacity>
                            <Text style={{textAlign: 'center', color: '#2FD5CF', fontSize: 20}}
                                onPress={this.props.logout}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}