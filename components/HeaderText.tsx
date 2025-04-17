import {
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import Colors from "constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import UtilsStyles from "constants/utils";
import { useRouter } from "expo-router";

const HeaderText = ({ text }: { text: string }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const router = useRouter();

  return (
    <View
      style={[
        UtilsStyles.flex,
        UtilsStyles.alignItemsCenter,
        UtilsStyles.justifyContentSapceBetween,
      ]}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          paddingVertical: 25,
          color: theme.text,
        }}
      >
        {text}
      </Text>
      <Pressable onPress={() => router.push("/notification")}>
        <Ionicons name="notifications" size={24} color={theme.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
});

export default HeaderText;
