import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext'
import FriendRequest from '../component/FriendRequest'

const FriendsScreen = () => {
    const {userId,setUserId} = useContext(UserType)
    const [friendRequests, setFriendRequests] = useState([])
    useEffect(()=>{
        fetchFriendRequests()
    },[])
    const fetchFriendRequests = async ()=>{
        try {
            console.log(userId);
            const res = await axios.get(`http://192.168.0.102:3000/friend-request/${userId}`)
          //  console.log(res.status);
            if(res.status===200){
                const friendRequestsData = res.data.map((friendRequest)=>({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                    image: friendRequest.image
                }))
                setFriendRequests(friendRequestsData)
            }
        } catch (error) {
            
        }
    }
   // console.log(friendRequests);
  return (
    <View style={{padding:10,marginHorizontal:12, flex:1}}>
        {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}
        {friendRequests.map((item,index)=>(
            <FriendRequest key={index} item={item} friendRequests = {friendRequests} setFriendRequests ={setFriendRequests}/>
        ))}
      
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})