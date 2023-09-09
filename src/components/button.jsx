import React from 'react';
import {Text, TouchableOpacity} from 'react-native'

const Button = ({name, onPress}) => {
    return (
        <TouchableOpacity 
        style={{
            backgroundColor: '#3498db',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 10,
        }}
        onPress={() => onPress()}
        >
            <Text 
            style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            }}
            >
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default Button