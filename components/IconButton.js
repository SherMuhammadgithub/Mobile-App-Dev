import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

export default function IconButton({ icon, label, onPress }) {
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons
                name={icon}
                size={38}
                color="#fff"
            />
            <Text style={styles.iconButtonLable}>{label}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLable: {
        color: "#fff",
        marginTop: 12
    }
})