
import { View,  StyleSheet } from "react-native";
import Button from "./Button";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const Buttons = () => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      <Button
        IconComponent={() => <Feather name="tv" size={18} color="gray" />}
        roomName="Living"
        roomPower={23}
        onPress={() => {
          router.push("/living");
        }} // Navigate to the living room screen
      />
      <Button
        IconComponent={() => (
          <FontAwesome name="cutlery" size={18} color="gray" />
        )}
        roomName="Kitchen"
        roomPower={23}
        onPress={() => {
          router.push("/kitchen");
        }}
      />
      <Button
        IconComponent={() => (
          <FontAwesome name="suitcase" size={18} color="gray" />
        )}
        roomName="Office"
        roomPower={23}
        onPress={() => {
          router.push("/office");
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({});

export default Buttons;
