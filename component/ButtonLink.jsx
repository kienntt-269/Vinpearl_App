import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native';

const ButtonLink = ({ label, style, screen, params, colorText}) => {
  return (
    <View
        style={[
            {
                borderRadius: 8,
                height: 50,
                width: 245,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#fff'
            },
            style
        ]}
    >
        <Link to={{ screen: screen, params: params }}>
            <Text
                style={{fontSize: 18, fontWeight: '700', color: colorText ? colorText : '#fff', textTransform: 'uppercase', textAlign: 'center'}}
            >
                {label}
            </Text>
        </Link>
    </View>
  )
}

export default ButtonLink

const styles = StyleSheet.create({})