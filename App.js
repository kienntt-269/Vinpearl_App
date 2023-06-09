import react, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './Main';
import * as Font from 'expo-font';
// import { LoadingContext } from './LoadingContext';

const loadFontAsync = async () => {
  await Font.loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-BlackItalic.ttf'),
  });
};

export default function App() {

  // const { loading, showLoading, hideLoading } = useContext(LoadingContext);

  useEffect(() => {
    // showLoading();
    // loadFontAsync().then(() => hideLoading());
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    loadFontAsync().then(() => setFontLoaded(true));
    return null;
  }

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
