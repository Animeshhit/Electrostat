import UtilsStyles from "constants/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "constants/Colors";
import HeaderText from "components/HeaderText";
import RoomCard from "components/RoomCard";
import { useEffect, useRef, useState } from "react";

//firebase
import { ref, onValue, update } from "firebase/database";
import { database } from "../lib/firebase";
import { Status } from "types/type";
import useStore from "../store/store";

export default function Living() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const { status, powerStatus } = useStore();

  const [roomSwtich, setRoomSwtich] = useState<Status>(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);

  const isFirstRun = useRef(true);

  useEffect(() => {
    const roomsRef = ref(database, "rooms/living");
    const unSubscribe = onValue(roomsRef, (snaps) => {
      const data = snaps.val();
      if (data !== null) {
        setCurrent(data.livingcurrent);
        setRoomSwtich(data.status);
        setPower(data.power);
      }
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const roomsRef = ref(database, "rooms/living");
    if (powerStatus) {
      update(roomsRef, {
        status: roomSwtich,
      }).catch((error) => {
        console.error("Failed to update status :", error);
      });
    }
  }, [roomSwtich]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Living" />
      <RoomCard
        roomSwitch={roomSwtich}
        setRoomSwtich={setRoomSwtich}
        current={current}
        powerConsumption={power}
        wifiMode={status}
      />
    </SafeAreaView>
  );
}
