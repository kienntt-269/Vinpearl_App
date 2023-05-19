import React, { useContext } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { LoadingContext } from '../LoadingContext';

const LoadingSpinner = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <Modal visible={loading} transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

export default LoadingSpinner;