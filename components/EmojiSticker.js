import { Image, View } from "react-native";

export default function EmojiSticker({ imageSize, stickerSource }) {
    return (
        <View style={{ top: -350 }}>
            <Image
                style={{ width: imageSize, height: imageSize }}
                resizeMode="contain"
                source={stickerSource}
            />
        </View>
    )
}