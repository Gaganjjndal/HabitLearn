import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

const CameraComponent = () => {
  const [photo, setPhoto] = useState(null);
  const [pText, setpText] = useState('Please Capture photo');

  const handleCapture = () => {
    launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert('Error', 'Failed to open camera. Please try again.');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log(uri);
        setPhoto(uri);
        scanImage(uri);
      }
    });
  };

  const scanImage = async url => {
    try {
      const result = await TextRecognition.recognize(url);
      const data = result.join('\n'); // Separate recognized text with new lines
      console.log(data);
      setpText(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to recognize text. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.captureContainer}>
        <Button title="Capture" onPress={handleCapture} />
        {photo && <Image source={{uri: photo}} style={styles.image} />}
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.text}>{pText}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CameraComponent;
