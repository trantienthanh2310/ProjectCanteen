import React, {Component} from 'react';
import {View, Text, Image, Button, TabBarIOS} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import ProfileCustomer from '../profile/ProfileCustomer';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.unsubscriber = null;
        this.state=({
            user: null,
        });
    }

    componentDidMount = ()=>{
        this.unsubscriber = auth().onAuthStateChanged((changeUser)=>{
            this.setState({user: changeUser});
        });
    }

    componentWillUnmount = ()=>{
        if(this.unsubscriber){
            this.unsubscriber();
        }
    }


    // loginWithFacebook = async ()=>{
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    //     const data = await AccessToken.getCurrentAccessToken();
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    //     return auth().signInWithCredential(facebookCredential);
    // }

    //remove login with Facebook

    logout = ()=>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }


    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    {this.state.user == null?<Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/mobileproject-47185.appspot.com/o/logo.png?alt=media&token=ba007594-5510-4612-b8d4-a80abe9db7e5'}}
                        style={{width: 400, height: 350}}
                    />:<ProfileCustomer user={this.state.user}
                        navigation={this.props.navigation}></ProfileCustomer>}
                    <View style={{width: 200, height: 60}}>
                        {this.state.user != null? <TouchableOpacity>
                                <Text style={{textAlign: 'center', color: '#2FD5CF', fontSize: 20}}
                                    onPress={this.logout}>Logout</Text>
                            </TouchableOpacity>:/*<Icon.Button name='facebook' backgroundColor="#3b5998"
                            onPress={this.loginWithFacebook}>Login with Facebook</Icon.Button>*/null}
                    </View>
                </View>
            </View>
        )
    }
}

