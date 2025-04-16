import { View, StyleSheet } from "react-native";
import Button from "./Button";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

//firebase
import { ref, onValue, update, off } from "firebase/database";
import { database } from "../../lib/firebase";

const dummyData = {
  name: "room name",
  power: 34,
  status: 0,
};

const Buttons = () => {
  const router = useRouter();
  const [kitchen, setKitchen] = useState(dummyData);
  const [living, setLiving] = useState(dummyData);
  const [office, setOffice] = useState(dummyData);

  useEffect(() => {
    const roomsRef = ref(database, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setKitchen(data.kitchen);
        setLiving(data.living);
        setOffice(data.office);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <View style={{ marginTop: 20, flexDirection: "column", gap: 10 }}>
      <Button
        IconComponent={() => <Feather name="tv" size={18} color="gray" />}
        roomName={living.name}
        roomPower={living.power}
        status={living.status}
        onPress={() => {
          router.push("/living");
        }} // Navigate to the living room screen
      />
      <Button
        IconComponent={() => (
          <FontAwesome name="cutlery" size={18} color="gray" />
        )}
        roomName={kitchen.name}
        status={kitchen.status}
        roomPower={kitchen.power}
        onPress={() => {
          router.push("/kitchen");
        }}
      />
      <Button
        IconComponent={() => (
          <FontAwesome name="suitcase" size={18} color="gray" />
        )}
        roomName={office.name}
        status={office.status}
        roomPower={office.power}
        onPress={() => {
          router.push("/office");
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({});

export default Buttons;
