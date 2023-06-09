import { ScrollView, StyleSheet, View, Text , TouchableOpacity, Image, FlatList, TouchableHighlight, ImageBackground, } from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import { selectSpinner } from '../redux/spinner/spinnerSlice';
import { Button } from "@react-native-material/core";
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Price from '../utils/Price';
import DefaultStyle from '../theme';
import LoadingSpinner from '../constants/LoadingSpinner';
import domain from '../api/domain';
import { useNavigation } from '@react-navigation/native';

// const Home = ({ navigation }) => {
const Home = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectSpinner);
  const [listOfPost, setListOfPost] = useState([]);
  const [listOfSuggest, setListOfSuggest] = useState([]);
  useEffect(() => {
    const getListOfSuggest = async () => {
      try {
          const res = await homeApi.getTourRecommendation(user.id);
          setListOfSuggest(res.data.data);
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
        onPress={() => navigation.navigate('Thông tin chi tiết tour', {
            itemId: item.id,
            // name: item.name,
        })}
    >
        <Image 
            style={{width: '100%', height: 192, width: 162, borderRadius: 12}}
            source={{uri: item?.images[0]?.path?.replace("http://localhost:8080", domain)}}
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
        })}
    >
      <Image 
          style={{width: '100%', height: 192, width: 162, borderRadius: 8}}
          source={{uri: item.path?.replace("http://localhost:8080", domain)}}
      />
      <Text numberOfLines={2} style={[DefaultStyle.text, styles.namePost]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      {
        isLoading ? <LoadingSpinner /> : 
        <ScrollView>
          <ImageBackground source={{uri: `${domain}/images/home/banner.png`}} resizeMode="cover" style={styles.image}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20, marginTop: 10, width: '100%'}}>
              <Text style={[DefaultStyle.text, styles.text]}>
                <Text>Xin chào, </Text>
                <Text style={{textTransform: 'uppercase'}}>
                  {user.fullName}
                </Text>
              </Text>
            </View>
          </ImageBackground>
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
          {
            listOfSuggest.length > 0 ? <View style={styles.suggest}>
              <Text style={[DefaultStyle.text, styles.title]}>Gợi ý cho bạn</Text>
              <FlatList
                  horizontal={true}
                  data={listOfSuggest}
                  renderItem={renderItemSuggest}
                  keyExtractor={(item) => item.id}
              />
            </View> : null
          }
          {
            listOfPost.length > 0 ? <View style={styles.suggest}>
              <Text style={[DefaultStyle.text, styles.title]}>Đánh giá của khách hàng</Text>
              <FlatList
                  horizontal={true}
                  data={listOfPost}
                  renderItem={renderItemPost}
                  keyExtractor={(item) => item.id}
              />
            </View> : null
          }
        </ScrollView>
      }
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 100,
    width: '100%',
    flexDirection: 'row',
  },
  text: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingLeft: 5,
  },
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