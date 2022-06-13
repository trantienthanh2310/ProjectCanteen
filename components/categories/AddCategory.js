import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import {style} from '../style';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
const ref = database().ref('categories');
export default class AddCategory extends Component{
    constructor(props){
        super(props);
        this.state=({
            img: '',
            name: '',
            loadPhoto: '',
            id: '',
        })
    }
    selectOnDevice = ()=>{
        let options = [];
        ImagePicker.launchImageLibrary(options, reponse=>{
            this.setState({
                img: reponse.path,
                loadPhoto: reponse.uri,
            })
        })
    }
   
    addCategories = ()=>{
        if(this.state.name==''||this.state.img==''){
            alert('Enter name & upload image', 'OK');
        }else{
            const filename = this.state.img.substring(this.state.img.lastIndexOf('/')+1);
            const refStorage = storage().ref(filename);
            refStorage.putFile(this.state.img).then(async()=>{
                const uri = await refStorage.getDownloadURL();
                await ref.child(this.state.id).set({name: this.state.name, img: uri, id: this.state.id}).then(
                    this.props.navigation.dispatch(CommonActions.goBack()));
            });
            console.log(this.state.img);
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 7, alignItems: 'center'}}>
                    <Image source={this.state.img !=''? {uri: this.state.loadPhoto}: null}
                        style={{width: Dimensions.get('window').width, height: '100%'}}
                    />
                        {/* <View style={{width: 200, height: 85, backgroundColor: 'white', position: 'absolute',
                            borderRadius: 10, top: 180, borderWidth: 0.5, justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}></Text>
                        </View> */}
                    </View>
                    <TouchableOpacity style={{marginTop: 30, marginLeft: 10}} onPress={this.selectOnDevice}>
                        <Icon name="add-photo-alternate" size={30} color='black'/>
                    </TouchableOpacity>
                <View style={{flex: 3, backgroundColor: 'white', marginTop: 20}}>
                        <View style={style.container}>
                            <Text style={style.textLabel}>ID: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({id: text})
                            })}}
                            ></TextInput>
                        </View>

                        <View style={style.container}>
                            <Text style={style.textLabel}>Name: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({name: text})
                            })}}
                            ></TextInput>
                        </View>
                </View>
                <Button style={{width: Dimensions.get('window').width,
                    height: 40, backgroundColor: '#2FD5CF',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 25}}
                    onPress={()=>{this.addCategories()}}>
                    Add
                </Button>
            </View>
        )
    }
}