import React, {Component} from 'react';
import {View, Text, TextInput, Image, Dimensions} from 'react-native';
import Button from 'react-native-button';
import auth from '@react-native-firebase/auth';
import Profile from './index';
export default class LoginAdmin extends Component{
    constructor(props){
        super(props);
        this.unsubscriber = null;
        this.state=({
            email: '',
            password: '',
            user: null,
        })
    }

    componentDidMount = ()=>{
        this.unsubscriber = auth().onAuthStateChanged((changedUser)=>{
            this.setState({user: changedUser});
        })
    }

    componentWillUnmount = ()=>{
        if(this.unsubscriber){
            this.unsubscriber();
        }
    }

    loginWithEmail = ()=>{
        auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    }

    logout = ()=>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }
    render(){
        return(
            <View style={{flex: 1}}>
                {this.state.user==null?<View style={{flex: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/mobileproject-47185.appspot.com/o/logo.png?alt=media&token=ba007594-5510-4612-b8d4-a80abe9db7e5'}}
                        style={{width: 400, height: 350}}
                    />
                    <TextInput style={{width: Dimensions.get('window').width-28, height: 60}} placeholder={'Email: '}
                        keyboardType={'email-address'}
                        onChangeText={(text)=>{this.setState(()=>{
                            return({email: text})
                        })}}></TextInput>
                    <TextInput style={{width: Dimensions.get('window').width-28, height: 60}} placeholder={'Password: '}
                        secureTextEntry={true}
                        onChangeText={(text)=>{this.setState(()=>{
                            return({password: text});
                        })}}></TextInput>
                    <Button style={{backgroundColor: "#2FD5CF", color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 10,
                        height:60,
                        width: 200,
                        borderRadius: 10}}
                        onPress={this.loginWithEmail}>Login</Button>
                </View>:<Profile navigation={this.props.navigation} logout={this.logout} email={this.state.user.email}></Profile>}
            </View>
        )
    }
}