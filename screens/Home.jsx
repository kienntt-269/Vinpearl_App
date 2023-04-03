import { ScrollView, StyleSheet, View, Text , TouchableOpacity, Image, FlatList, TouchableHighlight} from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import { Button } from "@react-native-material/core";
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Banner from '../component/Banner';
import Price from '../utils/Price';
import DefaultStyle from '../theme';

const Home = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [listOfPost, setListOfPost] = useState([])
  const [listOfSuggest, setListOfSuggest] = useState([])
  useEffect(() => {
    const getListOfSuggest = async () => {
      try {
        const data = {
          siteId: 2,
          page: 0,
          size: 5,
          sort: 'id,desc',
        }
          const res = await homeApi.searchTour(data);
          setListOfSuggest(res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfSuggest();
  }, [])

  useEffect(() => {
    const getListOfPost = async () => {
      try {
        const data = {
          page: 0,
          size: 5,
          sort: 'id,desc'
        }
          const res = await homeApi.searchPost(data);
          setListOfPost(res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfPost() 
  }, [])

  const renderItemSuggest = ({ item }) => (
    <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => navigation.navigate('TourDetail', {
            itemId: item.id,
            name: item.name,
        })}
    >
        <Image 
            style={{width: '100%', height: 192, width: 162, borderRadius: 12}}
            source={{uri: item.path}}
        />
        <View>
          <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
            {item.name}
          </Text>
          <View style={styles.price}>
            <Price active={true} value={item.priceMin}/>
          </View>
        </View>
    </TouchableOpacity>
  );

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
          source={{uri: item.path}}
      />
      <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ScrollView>
        <Banner />
        <View style={styles.homeSelect}>
          <View style={styles.item}>
            <TouchableHighlight onPress={() => navigation.navigate('SearchHotel')} style={styles.wrapper}>
              <View>
                <Ionicons name="ios-bed" size={30} color="#E8952F" />
                <Text style={[DefaultStyle.text, styles.name]}>Khách sạn</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={styles.wrapper}>
              <View>
                <FontAwesome name="plane" size={30} color="#E8952F" />
                <Text style={[DefaultStyle.text, styles.name]}>Vé máy bay</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight onPress={() => navigation.navigate('SearchTour')} style={styles.wrapper}>
              <View>
                <MaterialIcons name="tour" size={30} color="#E8952F" />
                <Text style={[DefaultStyle.text, styles.name]}>Tour & Trải nghiệm</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={styles.wrapper}>
              <View>
                <FontAwesome5 name="studiovinari" size={30} color="#E8952F" />
                <Text style={[DefaultStyle.text, styles.name]}>VinWonders</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.suggest}>
          <Text style={[DefaultStyle.text, styles.title]}>Gợi ý cho bạn</Text>
          <FlatList
              horizontal={true}
              data={listOfSuggest}
              renderItem={renderItemSuggest}
              keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.suggest}>
          <Text style={[DefaultStyle.text, styles.title]}>Đánh giá của khách hàng</Text>
          <FlatList
              horizontal={true}
              data={listOfPost}
              renderItem={renderItemPost}
              keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeSelect: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '50%', // is 50% of container width,
  },
  wrapper: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FEF4EA",
    minHeight: 90,
  },
  name: {
    marginTop: 10,
    fontWeight: '600'
  },
  suggest: {
    paddingLeft: 15,
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 20,
  },
  itemWrapper: {
    width: 150,
    paddingRight: 15,
    marginRight: 30,

  },
  nameSite: {
    position: 'absolute',
    bottom: 15,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  namePost: {
    marginTop: 10,
    fontWeight: '700'
  },
  price: {
    
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    marginVertical: 12,
  },
})