import { Image, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function EmojiSticker({ imageSize, stickerSource }) {
    const scaleImage = useSharedValue(imageSize);
    const doubleTap = Gesture.Tap().
        numberOfTaps(2).onStart(() => {
            if (scaleImage.value != imageSize * 2) {
                scaleImage.value = imageSize * 2
            } else {
                scaleImage.value = imageSize
            }
        })

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        }
    })

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const drag = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    })

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    })
    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                        resizeMode="contain"
                        source={stickerSource}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}