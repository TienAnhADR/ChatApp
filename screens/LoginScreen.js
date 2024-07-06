import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // await AsyncStorage.removeItem('authToken')
                const token = await AsyncStorage.getItem('authToken')
                if (token) {
                    navigation.replace('HomeScreen')
                } else {
                    // token not found, show the login screen itself

                }
            } catch (error) {
                console.log('err',err);
            }
        }
     //   checkLoginStatus()
    },[])
    const handleLogin = () => {
        console.log('Click login');
        const user = { email, password }
        axios.post("http://192.168.0.102:3000/login", user)
            .then((res) => {
                //console.log(res);
                const token = res.data.token
                AsyncStorage.setItem('authToken', token)
                navigation.replace('HomeScreen')
            })
            .catch((err) => {
                Alert.alert('Login Err', 'Invalid email or password')
                console.log('Login err', err);
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4A55A2', fontSize: 17, fontWeight: '600' }}>Sign In</Text>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 15 }}>Sign In to Your Account</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Email</Text>
                        <TextInput placeholder='Enter Your Email'
                            placeholderTextColor={"black"}
                            value={email}
                            onChangeText={(txt) => setEmail(txt)}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300, fontSize: email ? 18 : 18 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Password</Text>
                        <TextInput placeholder='Password'
                            placeholderTextColor={"black"}
                            value={password}
                            onChangeText={(txt) => setPassword(txt)}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300, fontSize: password ? 18 : 18 }}
                            secureTextEntry={true} />

                    </View>
                    <Pressable
                        onPress={handleLogin}
                        style={{ width: 200, backgroundColor: '#4a55a2', padding: 15, marginTop: 50, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('RegisterScreen')} style={{ marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Dont't have an account? Sign Up</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})