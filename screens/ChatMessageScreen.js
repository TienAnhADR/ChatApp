import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import { UserType } from '../UserContext';
import { useRoute } from '@react-navigation/native';

const ChatMessageScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false)
    const [message, setMessage] = useState('')
    const route = useRoute()
    const{recepientId} = route.params
    const { userId, setUserId } = useContext(UserType)
    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector)
    }
    const handleSend = async (messageType, imageUri)=>{
        try {
            const formData = new FormData()
            formData.append('senderId',userId)
            formData.append('recepientId',recepientId)

            // if the message type id image or a normal text
            if(messageType ==='image'){
                formData.append('messagerType','image')
                formData.append('imageFile',{
                    uri: imageUri,
                    name: 'image.jpg',
                    type:'image/jpeg'
                })
            } else{
                formData.append('messageType','text')
                formData.append('messageText',message)
            }

        } catch (error) {
            console.log('Err in sending the message', error);
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <ScrollView>

            </ScrollView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10,
                borderTopWidth: 1,
                borderTopColor: '#dddddd',
                marginBottom: showEmojiSelector ? 0: 25
            }}>
                <Entypo onPress={handleEmojiPress} style={{ marginRight: 10 }} name="emoji-happy" size={24} color="gray" />
                <TextInput
                    value={message}
                    onChangeText={(txt) => setMessage(txt)}
                    style={{
                        flex: 1, height: 40, borderWidth: 1,
                        borderColor: '#dddddd', borderRadius: 20,
                        paddingHorizontal: 10
                    }} placeholder='Type Your message...' />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginHorizontal: 8 }}>
                    <Feather name="camera" size={24} color="gray" />
                    <Feather name="mic" size={24} color="gray" />
                </View>
                <Pressable onPress={()=>handleSend('text')}
                 style={{ backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
                </Pressable>
            </View>
            {
                showEmojiSelector && (
                    <EmojiSelector onEmojiSelected={(emoji) => {
                        setMessage((prevMessage) => prevMessage + emoji)
                    }} style={{ height: 350 }} />
                )
            }
        </KeyboardAvoidingView>

    )
}

export default ChatMessageScreen

const styles = StyleSheet.create({})