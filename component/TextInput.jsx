import { StyleSheet, TextInput as RNTextInput, View } from 'react-native'
import React from 'react'

const TextInput = ({value, icon, style, ...otherProps}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          borderRadius: 4,
          borderColor: '#d9e1e2',
          borderWidth: 1,
          borderStyle: 'solid',
          width: '100%',
        }, style
      ]}
    >
      <RNTextInput 
        underlineColorAndroid='transparent'
        placeholderTextColor='rgba(34, 62, 75, 0.7)'
        {...otherProps}
        value={value}
        style={{
          padding: 8,
          paddingLeft: 12,
          paddingRight: 40,
          fontSize: 16,
        }}
      />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({})