import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// notice how we pass navigation in
const SignIn = ({ navigation }) => {
    return (
        <View>
            <Text>Log in</Text>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
                <Text>Go back to Sign up View</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignIn
