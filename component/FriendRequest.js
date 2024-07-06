import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { UserType } from '../UserContext'
import { useNavigation } from '@react-navigation/native'

const FriendRequest = (item, friendRequests, setFriendRequests) => {
  // console.log(friendRequests);
  const navigation = useNavigation()
  const {userId,setUserId} = useContext(UserType)
   //console.log(item);
   const acceptRequest = async (friendRequestsId) => {
    try {
      const res = await fetch(`http://192.168.0.102:3000/friend-request/accept`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          senderId: friendRequestsId,
          recepientId: userId
        })
      })
      if(res.ok){
        setFriendRequests(friendRequests.filter((req)=> req._id!== friendRequestsId))
        navigation.navigate('ChatsScreen')
      }

    } catch (error) {
      console.log('Err acceptin the friend request',error);
    }
   }
  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, }}>
      <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.item.image }} />
      <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10, flex:1 }}>{item.item?.name} sent you a friend request !!</Text>
      <Pressable onPress={()=>acceptRequest(item.item._id)}
       style={{ backgroundColor: '#0066b2', padding: 10, borderRadius: 6 }}>
        <Text style={{ textAlign: 'center', color: '#fff' }}>Accept</Text>
      </Pressable>
    </Pressable>
  )
}

export default FriendRequest

const styles = StyleSheet.create({})