import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import DefaultStyle from '../theme';

const PostDetail = ({route, value, icon, style, ...otherProps}) => {
  const { width } = useWindowDimensions();
  const { name } = route.params;
  console.log(name);
  const source = {
    html: name,
  };
  return (
    <ScrollView
      style={[DefaultStyle.text, styles.postDetail]}
    >
      <RenderHtml
        contentWidth={width}
        source={source}
      />
    </ScrollView>
  )
}

export default PostDetail

const styles = StyleSheet.create({
    postDetail: {
      padding: 20,
      backgroundColor: "#FFF",
    },
})