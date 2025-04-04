import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import DefaultLayout from "../../components/DefaultLayout";
import globalStyles from "../../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AuthService from "../../services/AuthService";

export default function RecuperarScreen() {

    const navigation = useNavigation();

    const [user, setUser] = useState({
        newPassword: "",
        confirmPassword: "",
        verificationCode: ""
    });
    const [isFocused, setIsFocused] = useState(null);
    const [error, setError] = useState('');

    const route = useRoute();
    const { email } = route.params || {};

    const handleChange = (value) => {
        setUser({
            ...user,
            [isFocused]: value
        });
    };

    const handleSubmit = async () => {
        if (!codigo) {
            setError("Ingrese codigo");
            return;
        }
        try {
            const response = await AuthService.resetPassword(email, codigo);
            console.log(response);
            if (response.success) {
                alert("Contrasena cambiada con exito");
                navigation.navigate("LoginScreen");
                setError('');
            } else {
                alert(response.message);
                setError(response.message);
            }
        } catch (error) {
            console.error("Error al enviar codigo:", error.message);
        }
    };
    return (
        <DefaultLayout>
            <View style={globalStyles.container}>
                <View style={{ paddingVertical: 20 }}>
                    <Text style={globalStyles.title}>Recuperar Contraseña</Text>
                    <Text style={[globalStyles.fontHomero, { fontSize: 20, color: "#fff", textAlign: "center" }]}>{email}</Text>
                </View>
                <View style={styles.form}>
                    <Ionicons name="key" style={styles.icon}></Ionicons>
                    <TextInput style={[styles.input, isFocused === "codigo" && styles.inputFocused]}
                        placeholder="Codigo"
                        placeholderTextColor="#ccc"
                        onChangeText={handleChange}
                        value={user.verificationCode}
                        onFocus={() => setIsFocused("codigo")}
                        onBlur={() => setIsFocused(null)} />
                    <TextInput style={[styles.input, isFocused === "contrasena" && styles.inputFocused]}
                        placeholder="Contraseña"
                        placeholderTextColor="#ccc"
                        onChangeText={handleChange}
                        value={user.newPassword}
                        onFocus={() => setIsFocused("contrasena")}
                        onBlur={() => setIsFocused(null)} />
                    <TextInput style={[styles.input, isFocused === "contrasenaConfirmar" && styles.inputFocused]}
                        placeholder="Confirmar Contrasena"
                        placeholderTextColor="#ccc"
                        onChangeText={handleChange}
                        value={user.confirmPassword}
                        onFocus={() => setIsFocused("contrasenaConfirmar")}
                        onBlur={() => setIsFocused(null)} />
                    <Text style={styles.error}>{error}</Text>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={[globalStyles.button, { width: "60%", alignSelf: "center", marginTop: 20 }]}>
                    <Text style={globalStyles.buttonText}>Recuperar Contraseña</Text>
                </TouchableOpacity>
            </View>
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        height: 40,
        width: '100%',
        borderRadius: 15,
        padding: 10,
        color: "#fff"
    },
    inputFocused: {
        borderColor: '#FFC107',
    },
    form: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    forgot: {
        fontSize: 12,
        paddingBottom: 20,
        paddingTop: 10,
        color: "#ccc",
    },
    error: {
        color: "red",
    },
    button: {
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#FFD700",
        borderRadius: 15,
        height: 40,
        width: '40%',
    },
    icon: {
        fontSize: 80,
        color: "#ccc",
    }
});