import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import Comment from './Comment';
import DefaultStyle from '../theme';
import homeApi from '../api/home/home';

const PostDetail = ({route, value, icon, style, ...otherProps}) => {
  const { width } = useWindowDimensions();
  const { itemId } = route.params;
  const [postDetail, setPostDetail] = useState()

  useEffect(() => {
    const getPostDetail = async () => {
      try {
          const res = await homeApi.postDetail(itemId);
          setPostDetail(res.data.data);
      } catch(err) {
          console.log(err)
      }
    }
    getPostDetail() 
  }, [])
  return (
    <ScrollView
      style={[DefaultStyle.text, styles.postDetail]}
    >
      <RenderHtml
        contentWidth={width}
        source={{html: postDetail?.content}}
      />
      {
        postDetail && <Comment postId={itemId}/>
      }
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