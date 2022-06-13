import {StyleSheet, Dimensions} from 'react-native';

const formatCurrency = (currency)=>{
    return currency.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

const style = StyleSheet.create({
    button:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    container:{
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        flex:1
    },

    textLabel:{
        fontSize: 18,
        fontWeight: 'bold',
    },

    textHeader:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewListItem_Profile:{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        borderWidth: 0.25,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    textListItem_Profile:{
        fontSize: 16,
    },
    container_Manage:{
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        flex:10
    },

    textLabel:{
        fontSize: 18,
        fontWeight: 'bold',
    },

    textInput:{
        borderBottomWidth: 1,
        width: 110,
        marginLeft: 10,
        height: 40
    },
    
    textLabel:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonAddQuanlityCustomer:{
        borderRadius: 20,
        borderWidth: 1,
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderColor: "#2FD5CF",
        color: "#2FD5CF",
        fontSize: 20,
        fontWeight: 'bold'
    },

    labelAddToCart: {
        color: 'white',
        fontSize: 16
    },
    
    buttonOrder:{
        width: 250,
        height: 50,
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: "#2FD5CF",
        padding: 10,
        borderRadius: 10
    },

    labelDetailBill:{
        fontSize: 20,
        fontWeight: 'bold',
    }
});


export {style, formatCurrency};