import React from 'react'
import Const from 'expo-constants';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import homeroImg from '../../assets/favicon.png';
import globalStyles from '../../styles/globalStyles';
import AdminLayout from '../../components/AdminLayout';

export default function IndexAdmin() {
    return (
        <AdminLayout>
            <View style={styles.container}>
                <Image style={styles.img} source={homeroImg}></Image>
                <View>
                    <Text style={styles.text}>Si lo que buscas es sabor, Mr. Homero es el mejor</Text>
                </View>
            </View>
        </AdminLayout>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Const.statusBarHeight
    },
    img: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 30,
        flex: 1,
        marginHorizontal: 20,
        marginTop: 25,
        textAlign: 'center'
    }
});
