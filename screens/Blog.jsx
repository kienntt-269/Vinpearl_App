import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import { FontAwesome5 } from '@expo/vector-icons';
import DefaultStyle from '../theme';
import domain from '../api/domain';

const Blog = () => {
  const [page, setPage] = useState(0);
  const [listOfPost, setListOfPost] = useState([])
  useEffect(() => {
    const getListOfPost = async () => {
      try {
        const data = {
          page: page,
          size: 9,
          sort: 'id,desc'
        }
          const res = await homeApi.searchPost(data);
          setListOfPost(...listOfPost, res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfPost() 
  }, [page])

  const renderItemPost = ({ item }) => (
    <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => navigation.navigate('PostDetail', {
            itemId: item.id,
            name: item.content,
        })}
    >
      <Image 
          style={{width: '100%', height: 192, width: 162, borderRadius: 8}}
          source={{uri: item.path?.replace("http://localhost:8080", domain)}}
      />
      <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
        {item.name}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <FontAwesome5 name="heart" size={24} color="black" />
          <Text style={[DefaultStyle.text, {marginLeft: 6}]}>{item.name}</Text>
        </View>
        <View>
          <FontAwesome5 name="comment" size={24} color="black" />
          <Text style={[DefaultStyle.text, {marginLeft: 6}]}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Blog</Text>
      <FlatList
        data={listOfPost}
        renderItem={renderItemPost}
        keyExtractor={(item) => item.id}
        onEndReached={() => {setPage(page + 1)}}
      />
    </View>
  )
}

export default Blog

const styles = StyleSheet.create({
  itemWrapper: {
    width: 150,
    paddingRight: 15,
    marginRight: 30,

  },
  namePost: {
    marginTop: 10,
    fontWeight: '700'
  },
})