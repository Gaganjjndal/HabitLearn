import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import CameraComponent from './src/CameraComponent';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
