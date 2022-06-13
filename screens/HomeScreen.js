import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Header from '../components/customer/Header';
import Banner from '../components/customer/Banner';
import Categories from '../components/customer/Categories';
import ListFoods from '../components/customer/ListFoods';
import { ScrollView } from 'react-native-gesture-handler';
import Cart from '../components/customer/Cart';
import auth from '@react-native-firebase/auth';

export default class HomeScreen extends Component{

    render(){
        const{uid, email} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                {/* <ScrollView> */}
                    <Header navigation={this.props.navigation} uid={uid}></Header>
                    <Categories></Categories>
                    <Banner></Banner>
                    <ListFoods navigation={this.props.navigation} route={this.props.route}
                        uid={uid}></ListFoods>
                {/* </ScrollView> */}
                <Cart navigation={this.props.navigation} uid={uid} email={email}></Cart>
            </View>
        )
    }
}