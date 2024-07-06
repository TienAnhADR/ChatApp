import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext'
import { useNavigation } from '@react-navigation/native'
import UserChat from '../component/UserChat'

const ChatsScreen = () => {
  const [acceptedFriends,setAcceptedFriends] = useState([])
  const { userId, setUserId } = useContext(UserType)
  const navigation = useNavigation()
  useEffect(()=>{
    const acceptedFriendsList = async () =>{
      try {
        const res = await fetch(`http://192.168.0.102:3000/accepted-fiends/${userId}`)
        const data = await res.json()
        if(res.ok){
          setAcceptedFriends(data)
        }
      } catch (error) {
        console.log('Err showing the accepted friends',error);
      }
    }
    acceptedFriendsList()
  },[])
  console.log('friends',acceptedFriends);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item,index)=>(
          <UserChat key={index} item = {item}/>
        ))}
      </Pressable>
    </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})