import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import { FontAwesome5 } from '@expo/vector-icons';
import DefaultStyle from '../theme';
import domain from '../api/domain';
import { useNavigation } from '@react-navigation/native';

const Blog = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const [page, setPage] = useState(0);
  const [listOfPost, setListOfPost] = useState([])
  useEffect(() => {
    const getListOfPost = async () => {
      try {
        const data = {
          page: 0,
          size: 100,
          sort: 'id,desc'
        }
          const res = await homeApi.searchPost(data);
          // setListOfPost(...listOfPost, res.data.data.content);
          setListOfPost(res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfPost() 
  }, [])

  const renderItemPost = ({ item }) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => navigation.navigate('PostDetail', {
        itemId: item.id,
      })}
    >
      <Image 
          style={{width: '100%', height: 300, borderRadius: 8}}
          source={{uri: item.path?.replace("http://localhost:8080", domain)}}
      />
      <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
        {item.name}
      </Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <FontAwesome5 name="heart" size={24} color="black" />
          <Text style={[DefaultStyle.text, {marginLeft: 6}]}>{item.countLike}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <FontAwesome5 name="comment" size={24} color="black" />
          <Text style={[DefaultStyle.text, {marginLeft: 6}]}>{item.countComment}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
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
    width: '100%',
    paddingHorizontal: 15,
    marginRight: 30,

  },
  namePost: {
    marginTop: 10,
    fontWeight: '700',
    width: '100%',
  },
})