import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import homeApi from '../api/home/home'
import utils from '../utils/utils'

const Comment = ({ postId }) => {
  const [listOfData, setListOfData] = useState([])
  const [comment, setComment] = useState([]);

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
    getListOfComment() 
  }, [])

  const handleSubmit = async () => {
    const data = {
      content: comment,
      customerId: localStorage.getItem(utils.CONSTANTS.CUSTOMER_ID),
    }
    try {
      const res = await homeApi.addComment(postId, data);

      if (res.data.code === 200) {
        
      } else {
        alert("lỗi");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentTitle}>Comments</Text>
      <FlatList
        data={listOfData}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentContent}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.commentForm}>
      <View style={styles.commentUser}>
        <Image source={{ uri: 'http://192.168.1.3:8080/images/home/logo/empty-page.png' }} style={styles.commentUserImage} />
        <Text style={styles.commentUserName}>Nguyễn Văn A</Text>
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
  commentContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    padding: 8,
  },
  commentInputText: {
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
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