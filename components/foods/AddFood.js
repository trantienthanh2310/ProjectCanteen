import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Dimensions, TextInput, Image, KeyboardAvoidingView, FlatList, Modal} from 'react-native';
import Button from 'react-native-button';
import {Picker} from '@react-native-picker/picker';
import {style, formatCurrency} from '../style';
import database from '@react-native-firebase/database';
// import {Detail, ListFoods, AddFood} from '../';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Profile, Manage, Detail, ListFoods, AddFood, Update} from '../../screens/NameScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const reference = database().ref('/foods/');
const refCategory = database().ref('categories');
export default class AddNewFood extends Component{
    constructor(props){
        super(props);
        this.state=({
            id: '',
            name: '',
            img: '',
            price: '',
            category: 'Mì',
            loadPhoto: '',
            categories: [],
        })
    }

    componentDidMount = ()=>{
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

    addFood = ()=>{
        if(this.state.id == '' || this.state.price == null || this.state.name == ''){
            alert('@Require: text field not null! ', 'OK');
        }else{
            const filename = this.state.img.substring(this.state.img.lastIndexOf('/')+1);
            const refStorage = storage().ref(filename);
            refStorage.putFile(this.state.img).then(()=>{
                console.log('Image upload to bucket!');
            }).then(async()=>{
                const uri = await refStorage.getDownloadURL();
                this.setState({img: uri});
                await reference.child(this.state.id.toUpperCase()).set({id: this.state.id.toUpperCase(), name: this.state.name, price: this.state.price, category: this.state.category,
                    img: uri}).then(this.props.navigation.navigate(ListFoods));
            })
        }
        
    }

    takeAPhoto = ()=>{
        let options = [
        ];
        ImagePicker.launchCamera(options, reponse=>{
            this.setState({
                img: reponse.path,
                loadPhoto: reponse.uri
            })
        });
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

    render(){
        return(
            <ScrollView>
            <View style={{flex: 70}}>
                    <View style={{width: Dimensions.get('window').width,
                        height: 200,
                        backgroundColor: '#DFDDDD',
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <TouchableHighlight onPress={this.takeAPhoto}>
                        {this.state.img==''?<Icon name="add-a-photo" size={100} color='black'/>:<Image source={{uri: this.state.loadPhoto}}
                                style={this.state.img != ''? {width: 300, height: 200} :{}}/>}
                        </TouchableHighlight>
                    </View>
                    <TouchableOpacity onPress={this.takeLibary} style={{marginLeft: 10}}>
                        <View>
                            <Icon name="add-photo-alternate" size={30} color='black'/>
                            <Text>Select on device</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 40, backgroundColor: 'white', marginTop: 20}}>
                        <View style={style.container_Manage}>
                            <Text style={style.textLabel}>ID: </Text>
                            <TextInput style={{backgroundColor: '#DFDDDD', width: 110, height: 40}}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({id: text});
                            })}}></TextInput>
                        </View>
                        <View style={style.container_Manage}>
                            <Text style={style.textLabel}>Price: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({price: text})
                            })}}></TextInput>
                        </View>

                        <View style={style.container_Manage}>
                            <Text style={style.textLabel}>Name: </Text>
                            <TextInput style={style.textInput}
                            onChangeText={(text)=>{this.setState(()=>{
                                return({name: text})
                            })}}></TextInput>
                        </View>

                        <View style={style.container_Manage}>
                            <Text style={style.textLabel}>Category: </Text>
                            <Picker selectedValue={this.state.category}
                            mode={'dropdown'}
                            style={{width: 200, height: 40}}
                            onValueChange={(itemValue)=>{
                                this.setState({category: itemValue})
                            }}>
                                {this.state.categories.map(item=>{
                                    return(<Picker.Item label={item.name} value={item.name} key={item.id}>

                                    </Picker.Item>)
                                })}
                            </Picker>
                        </View>
                    </View>
                    <Button style={{width: Dimensions.get('window').width,
                    height: 40, backgroundColor: '#2FD5CF',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 25}}
                    onPress={this.addFood}>Add</Button>
            </View>
            </ScrollView>
        )
    }
}