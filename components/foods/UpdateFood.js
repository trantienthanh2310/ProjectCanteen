import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, Alert} from 'react-native';
import Button from 'react-native-button';
import {CommonActions} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';
import {style} from '../style';
import storage from '@react-native-firebase/storage';
const reference = database().ref('/foods/');
import {Manage} from '../../screens/NameScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
const refCategory = database().ref('categories');
export default class UpdateFood extends Component{
    constructor(props){
        super(props);
        this.state=({
            category: '',
            id: '',
            price: '',
            name: '',
            img: '',
            loadPhoto: '',
            categories: [],
        })
    }

    componentDidMount = ()=>{
        const {id} = this.props.route.params;
        reference.child(id).on('value', snapshot=>{
            if(snapshot.exists()){
                this.setState({category: snapshot.toJSON().category})
            }else{
                this.setState({category: ''});
            }
            
        });

        refCategory.on('value', snapshot=>{
            const items = [];
            snapshot.forEach(element => {
                items.push({
                    id: element.toJSON().id,
                    name: element.toJSON().name,
                })
            });
            this.setState({
                categories: items,
            })
        })
        
    }

    takeAPhoTo = ()=>{
        let options = [
        ];
        ImagePicker.launchCamera(options, reponse=>{
            this.setState({
                img: reponse.path,
                loadPhoto: reponse.uri
            })
        })
    }

    takeLibary = ()=>{
        let options = [];
        ImagePicker.launchImageLibrary(options, reponse=>{
            this.setState({
                img: reponse.path,
                loadPhoto: reponse.uri
            })
        })
    }

    updateImg = (text)=>{
        const filename = this.state.img.substring(this.state.img.lastIndexOf('/')+1);
        const refStorage = storage().ref(filename);
        refStorage.putFile(this.state.img).then(async()=>{
            const uri = await refStorage.getDownloadURL();
            await reference.child(text).update({img: uri});
        })
    }
    render(){
        const {id, price, name, category, img} = this.props.route.params;
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 3, backgroundColor: 'red', alignItems: 'center'}}>
                    <TouchableHighlight onPress={this.takeAPhoTo}>
                        <Image source={this.state.img==''? {uri: img}:{uri: this.state.loadPhoto}}
                            style={{width: Dimensions.get('window').width, height: 250}}
                        />
                    </TouchableHighlight>
                        <View style={{width: 200, height: 85, backgroundColor: 'white', position: 'absolute',
                            borderRadius: 10, top: 180, borderWidth: 0.5, justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold',}}>{name}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{marginTop: 80, marginLeft: 10}} onPress={this.takeLibary}>
                        <Icon name="add-photo-alternate" size={30} color='black'/>
                    </TouchableOpacity>
                <View style={{flex: 7, backgroundColor: 'white', marginTop: 20}}>
                        <View style={style.container}>
                            <Text style={style.textLabel}>ID: </Text>
                            <TextInput style={{backgroundColor: '#DFDDDD', width: 110, height: 40}}
                            defaultValue={id}
                            editable={false}
                            onChangeText={()=>{this.setState(()=>{
                                return({id: id})
                            })}}></TextInput>
                        </View>
                        <Text>{this.state.id}</Text>
                        <View style={style.container}>
                            <Text style={style.textLabel}>Price: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({price: text})
                            })}}
                            defaultValue={price}></TextInput>
                        </View>
                        <View style={style.container}>
                            <Text style={style.textLabel}>Name: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({name: text})
                            })}}
                            defaultValue={name}></TextInput>
                        </View>
                        
                        <View style={style.container}>
                            <Text style={style.textLabel}>Category: </Text>
                            <Picker selectedValue={this.state.category}
                            mode={'dropdown'}
                            style={{width: 200, height: 40}}
                            onValueChange={(itemValue)=>{
                                this.setState({category: itemValue})
                            }}>
                                {this.state.categories.map(item=>{
                                    return(<Picker.Item label={item.name} value={item.name} key={item.name}>

                                    </Picker.Item>)
                                })}
                            </Picker>
                    </View>      
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, alignItems: 'center', backgroundColor: '#2FD5CF'}}>
                    <Button style={{width: Dimensions.get('window').width,
                    height: 40, backgroundColor: '#2FD5CF',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 25}}
                    onPress={()=>{
                        if(this.state.name!=''){
                            reference.child(id).update({name: this.state.name});
                        }
                        if(this.state.category!=''){
                            reference.child(id).update({category: this.state.category});
                        }
                        if(this.state.price!=''){
                            reference.child(id).update({price: this.state.price});
                        }
                        if(this.state.img!=''){
                            this.updateImg(id)
                        }
                        this.props.navigation.navigate(Manage)
                    }}>
                        Update
                    </Button>
                </View>   
            </View>
        )
    }
}