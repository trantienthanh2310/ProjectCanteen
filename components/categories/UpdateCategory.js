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
export default class UpdateCategory extends Component{
    constructor(props){
        super(props);
        this.state=({
            img: '',
            name: '',
            loadPhoto: '',
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
    updateImg = ()=>{
        const {id} = this.props.route.params;
        const fileName = this.state.img.substring(this.state.img.lastIndexOf('/')+1);
        const refStorage = storage().ref(fileName);
        refStorage.putFile(this.state.img).then(async()=>{
            const uri = await refStorage.getDownloadURL();
            await ref.child(id).update({img: uri});
        })
    }
    render(){
        const {name, img, id} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 7, backgroundColor: 'red', alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.takeAPhoTo}>
                        <Image source={this.state.img==''? {uri: img}:{uri: this.state.loadPhoto}}
                            style={{width: Dimensions.get('window').width, height: '100%'}}
                        />
                    </TouchableHighlight>
                        <View style={{width: 200, height: 85, backgroundColor: 'white', position: 'absolute',
                            borderRadius: 10, top: 400, borderWidth: 0.5, justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}>{name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{marginTop: 20, marginLeft: 10}} onPress={this.selectOnDevice}>
                        <Icon name="add-photo-alternate" size={30} color='black'/>
                    </TouchableOpacity>
                <View style={{flex: 3, backgroundColor: 'white', marginTop: 20}}>
                        <View style={style.container}>
                            <Text style={style.textLabel}>Name: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({name: text})
                            })}}
                            defaultValue={name}
                            ></TextInput>
                        </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, alignItems: 'center', backgroundColor: '#2FD5CF'}}>
                    <Button style={style.button}
                        onPress={()=>{
                            if(this.state.name!=''){
                                ref.child(id).update({name: this.state.name});
                            }
                            if(this.state.img !=''){
                                this.updateImg();
                            }
                            alert('Update succesfully!', 'OK')
                            this.props.navigation.dispatch(CommonActions.goBack());
                        }}>
                        Update
                    </Button>
                    <Button style={style.button} onPress={()=>{
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text: 'No', onPress: ()=>{}, style:'cancel'},
                                {text: 'Yes', onPress: ()=>{ref.child(id.toString()).remove().then(this.props.navigation.dispatch(CommonActions.goBack()))}},
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