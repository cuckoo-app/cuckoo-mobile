import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// notice how this.props.navigation just works, no mapStateToProps
// some wizards made this, not me
class SignUp extends Component {
    render() {
        return (
            <View>
                <Text>Signup</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Go to Login View</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default SignUp
