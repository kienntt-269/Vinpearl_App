import React, { useContext } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

const LoadingSpinner = () => {

  return (
    <Modal transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <ActivityIndicator size="large" color="#CCC" />
      </View>
    </Modal>
  );
};

export default LoadingSpinner;