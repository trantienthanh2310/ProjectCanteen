import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import FoodScreen from './FoodScreen';
import ProfileScreen from './ProfileScreen';
import {Profile, Manage, Detail, Update, Bill, Home} from './NameScreen';
import UpdateFood from '../components/foods/UpdateFood';
import DetailFood from '../components/foods/DetailFood';
import BillScreen from './BillScreen';
import DetailBill from '../components/bills/DetailBill';
import HomeScreen from './HomeScreen';
import AddToCart from '../components/customer/AddToCart';
import DetailCart from '../components/customer/DetailCart';
import LoginScreen from './LoginScreen';
import Login from '../components/profile/Login';
import SearchFoods from '../components/customer/SearchFood';
import SearchFood from '../components/foods/SearchFood';
import SearchBill from '../components/bills/SearchBill';
import CouponScreen from './CouponScreen';
import UpdateCategory from '../components/categories/UpdateCategory';
import AddCategory from '../components/categories/AddCategory';
const Stack = createStackNavigator();
export default class ScreenNavigation extends Component{
    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
                    <Stack.Screen name={Home} component={HomeScreen}></Stack.Screen>
                    <Stack.Screen name={Profile} component={ProfileScreen}></Stack.Screen>
                    <Stack.Screen name={Manage} component={FoodScreen}></Stack.Screen>
                    <Stack.Screen name={Detail} component={DetailFood}></Stack.Screen>
                    <Stack.Screen name={Update} component={UpdateFood}></Stack.Screen>
                    <Stack.Screen name={Bill} component={BillScreen}></Stack.Screen>
                    <Stack.Screen name="Search" component={SearchFoods}></Stack.Screen>
                    <Stack.Screen name="AdminSearch" component={SearchFood}></Stack.Screen>
                    <Stack.Screen name="BillDetail" component={DetailBill}></Stack.Screen>
                    <Stack.Screen name="AddToCart" component={AddToCart}></Stack.Screen>
                    <Stack.Screen name="DetailCart" component={DetailCart}></Stack.Screen>
                    <Stack.Screen name="SearchBill" component={SearchBill}></Stack.Screen>
                    <Stack.Screen name="Coupon" component={CouponScreen}></Stack.Screen>
                    <Stack.Screen name="UpdateCategory" component={UpdateCategory}></Stack.Screen>
                    <Stack.Screen name="AddCategory" component={AddCategory}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}