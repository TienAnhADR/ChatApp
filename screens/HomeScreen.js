import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const jwtDecode = require('jwt-decode')
import axios from 'axios';
import User from '../component/User';
// import { jwtDecode } from "jwt-decode";
import { decode } from 'base-64'
global.atob = decode


//  console.log('thu vien 222',jwtDecode);

const HomeScreen = () => {
    const navigation = useNavigation()
    const { userId, setUserId } = useContext(UserType)
    const [users, setusers] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <Text>Swift Chat</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Ionicons onPress={()=>navigation.navigate('ChatsScreen')} name="chatbox-ellipses-outline" size={24} color="black" />
                    <Ionicons onPress={()=>navigation.navigate('FriendsScreen')} name="people-outline" size={24} color="black" />
                </View>
            )
        })
    })
    const getPayloadFromToken = (token) => {
        try {
            // Tách token thành các phần
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid token');
            }

            // Phần payload là phần thứ hai
            const payload = parts[1];

            // Giải mã payload từ base64
            const decodedPayload = global.atob(payload);

            return decodedPayload;  // Trả về chuỗi payload đã giải mã
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('authToken')
            const payload = getPayloadFromToken(token)
            const payloadObj = JSON.parse(payload)
            // console.log(payloadObj.userId);

            setUserId(payloadObj.userId)
            console.log('user id',userId);
            axios.get(`http://192.168.0.102:3000/user/${payloadObj.userId}`)
                .then((res) => {
                    setusers(res.data);
                })
                .catch((err) => {
                    console.log('Err retrieving users', err);
                })
        }
        fetchUser()
    }, [])
    return (
        <View>
            <View style={{padding:10}}>
                {
                    users.map((item, index) => (
                        <User key={index} item={item} />
                    ))
                }
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})