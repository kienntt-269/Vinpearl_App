import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import utils from '../utils/utils'
import domain from '../api/domain'
import RenderHTML from 'react-native-render-html'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/user/userSlice'

const Comment = ({ postId }) => {
  const user = useSelector(selectUser);
  const [listOfData, setListOfData] = useState([])
  const [comment, setComment] = useState([]);
  const [reRenderComment, setReRenderComment] = useState(false);

  useEffect(() => {
    const getListOfComment = async () => {
      try {
        const data = {
          page: 0,
          size: 200,
          sort: 'id,desc',
        }
        const res = await homeApi.searchComment(postId, data);
        setListOfData(res.data.data.content);
      } catch(err) {
          console.log(err)
      }
    }
    getListOfComment();
    setReRenderComment(false);
  }, [reRenderComment])

  const handleSubmit = async () => {
    const data = {
      content: comment,
      customerId: user.id,
    }
    try {
      const res = await homeApi.addComment(postId, data);

      if (res.data.code === 200) {
        setReRenderComment(true);
        setComment("");
      } else {
        alert("lỗi");
      }
    } catch (err) {
      alert(err);
    }
  }

  const { width } = useWindowDimensions();

  return (
    <View style={styles.commentWrapper}>
      <Text style={styles.commentTitle}>Bình luận</Text>
      <FlatList
        data={listOfData}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image source={{ uri: `${domain}/images/home/danang.png` }} style={styles.commentUserImage} />
              <Text style={styles.commentAuthor}>{item?.customer?.fullName}</Text>
            </View>
            <View style={{width: '100%', borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginTop: 10, }}>
              <RenderHTML
                contentWidth={width}
                source={{html: item?.content}}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.commentForm}>
        <View style={styles.commentUser}>
          <Image source={{ uri: `${domain}/images/home/danang.png` }} style={styles.commentUserImage} />
          <Text style={styles.commentUserName}>{user.fullName}</Text>
        </View>
        <View style={styles.commentInput}>
          <TextInput
            style={styles.commentInputText}
            placeholder="Thêm mới bình luận"
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            style={styles.commentFormButton}
            onPress={handleSubmit}
          >
            <Text style={styles.commentFormButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
  commentWrapper: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#CCCCCC',
  },
  commentContainer: {
    marginTop: 10,
    marginBottom: 10,

  },

  commentTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },

  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  commentContent: {
    marginBottom: 10,
  },

  commentForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentUserImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentUserName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    padding: 8,
  },
  commentInputText: {
    flex: 1,
    fontSize: 16,
    minHeight: 120,
  },
  commentFormButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  commentFormButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})