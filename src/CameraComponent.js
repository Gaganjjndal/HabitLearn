import React from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const CameraComponent = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleCapture = () => {
    launchCamera(
      { mediaType: 'photo', cameraType: 'back' },
      (response) => {
        if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Error', 'Failed to open camera. Please try again.');
        } else if (response.uri) {
          setPhoto(response.uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Capture" onPress={handleCapture} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default CameraComponent;
