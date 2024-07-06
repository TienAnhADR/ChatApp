import { StyleSheet, KeyboardAvoidingView, Pressable, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const RegisterScreen = (props) => {
    const { navigation } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const handleRegister = async () => {
        const user = { name:name, password:password, email:email, image:image }
        console.log('vao day');

        // send a POST request to the backend API to register the user
        // const res = await axios.post('http://127.0.0.1:3000/register')
        axios.post('http://192.168.0.102:3000/register', user)
            .then((res) => {
                console.log(res);
                Alert.alert('Registration successful', 'You have been registered Successfully')
                setName('')
                setEmail('')
                setPassword('')
                setImage('')
            })
            .catch((err) => {
                Alert.alert('Registration Error', 'An error occurred while rigistering')
                console.log('Registration failed', err);
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4A55A2', fontSize: 17, fontWeight: '600' }}>Register</Text>
                    <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 15 }}>Register to your Account</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Name</Text>
                        <TextInput placeholder='Enter Your Name'
                            placeholderTextColor={"black"}
                            value={name}
                            onChangeText={(txt) => setName(txt)}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300, fontSize: name ? 18 : 18 }} />
                    </View>
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
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>Image</Text>
                        <TextInput placeholder='Image'
                            placeholderTextColor={"black"}
                            value={image}
                            onChangeText={(txt) => setImage(txt)}
                            style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10, width: 300, fontSize: image ? 18 : 18 }}
                        />

                    </View>
                    <Pressable onPress={handleRegister}
                        style={{ width: 200, backgroundColor: '#4a55a2', padding: 15, marginTop: 50, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6 }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Already have an account? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})