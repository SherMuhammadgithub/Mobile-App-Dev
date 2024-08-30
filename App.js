import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library"
import { captureRef } from 'react-native-view-shot';

const placeHolderImg = require('./assets/images/background-image.png')
export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image my dear user!");
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(null);
    setPickedEmoji(null);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status == null) {
    requestPermission();
  }

  const imageReaf = useRef();
  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageReaf, {
        height: 440,
        quality: 1,
      })
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("saved!");
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageReaf} collapsable={false} >
          <ImageViewer placeHolderImageSource={placeHolderImg} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
        <EmojiList onSelected={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      {showAppOptions ? (
        <View style={styles.optionsConatiner}>
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>

      ) : (
        <View style={styles.footerContainer}>
          <Button theme={"primary"} label="choose a photo" onPress={pickImageAsync} />
          <Button label="use this photo" onPress={() => setShowAppOptions(true)} />

        </View>)}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsConatiner: {
    position: 'absolute',
    bottom: 80,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
