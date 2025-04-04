import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import DefaultLayout from '../../components/DefaultLayout'
import { useNavigation } from '@react-navigation/native'
import foto from '../../assets/slider/hamburguesa.jpg'
import Swiper from 'react-native-swiper';
import useMenu from '../../hooks/useMenu'
import useVentas from '../../hooks/useVentas'

const { width } = Dimensions.get('window');


const images = [
    { id: '1', image: foto },
    { id: '2', image: foto },
    { id: '3', image: foto },
]



export default function IndexDefault() {
    const navigation = useNavigation();

    const { data: categorias } = useMenu("categorias");
    const { data: productos } = useVentas("productosMasVendidos", { year: new Date().getFullYear(), month: new Date().getMonth() + 1 });


    return (
        <DefaultLayout>
            <View style={styles.sliderContainer}>
                <Swiper autoplay autoplayTimeout={5} showsPagination={false}>
                    {images.map((item) => (
                        <View key={item.id} style={styles.slider}>
                            <Image style={styles.img} source={item.image} />
                            <Text style={styles.textSlider}>Si lo que buscas es sabor {"\n"} Mr. Homero es el mejor</Text>
                        </View>
                    ))}
                </Swiper>
            </View>
            <View >
                <Text style={styles.divider}>Categorias</Text>
                <View style={styles.line} />
            </View>
            <View>
                <FlatList
                    data={categorias}
                    keyExtractor={(item) => item.id_categoria}
                    horizontal={true}
                    renderItem={({ item: categoria }) => (
                        <View style={styles.cartasContainer}>
                            <View key={categoria.id_categoria} style={styles.cartas}>
                                < Image source={{ uri: categoria.cat_foto }} style={styles.imgCartas} />
                                <Text style={styles.textCartas}>{categoria.cat_nom}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View>
                <View >
                    <Text style={styles.divider}>Destacados</Text>
                    <View style={styles.line} />
                </View>
                {productos.length === 0 ? (
                    <Text style={{
                        color: "#ccc", fontSize: 20, textAlign: "center",
                        paddingVertical: 50
                    }}>No hay productos destacados</Text>
                ) : (
                    <FlatList
                        data={productos}
                        keyExtractor={(item, index) => `${item.pro_nom}-${index}`}
                        horizontal={true}
                        renderItem={({ item: producto }) => (
                            <View style={styles.cartasContainer}>
                                <View style={styles.cartas}>
                                    <Image source={{ uri: producto.pro_foto }} style={styles.imgCartas} />
                                    <Text style={styles.textCartas}>{producto.pro_nom}</Text>
                                    <Text style={{ color: "#FFC107", paddingTop: 5, fontSize: 10 }}>Cantidad: {producto.cantidad_vendida}</Text>
                                </View>
                            </View>
                        )}
                    />
                )}

            </View>
        </DefaultLayout >
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        width: width,
        height: 300,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        overflow: 'hidden',
        position: 'relative'
    },
    slider: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    img: {
        resizeMode: 'cover',
        height: "100%",
        width: "100%",
        opacity: 0.6
    },
    textSlider: {
        color: '#fff',
        fontSize: 23,
        position: 'absolute',
        bottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 20
    },
    divider: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        top: 10,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    line: {
        alignSelf: 'flex-end',
        marginRight: 20,
        width: '50%',
        height: 1,
        backgroundColor: '#FFC107',
    },
    cartasContainer: {
        display: 'flex',
        marginTop: 6,
        marginBottom: 10,
        marginLeft: 15,
        paddingLeft: 6
    },
    cartas: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 20
    },
    imgCartas: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    textCartas: {
        color: '#fff',
        paddingTop: 6,
        fontWeight: 'bold',

    },
    precioCartas: {
        color: '#FFC107',
        paddingTop: 4
    }
})