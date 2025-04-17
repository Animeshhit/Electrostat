import UtilsStyles from "constants/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "constants/Colors";
import HeaderText from "components/HeaderText";
import RoomCard from "components/RoomCard";

//firebase
import { ref, onValue, update } from "firebase/database";
import { database } from "../lib/firebase";
import { useEffect, useRef, useState } from "react";
import { Status } from "types/type";
import useStore from "../store/store";

export default function Office() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const [roomSwtich, setRoomSwtich] = useState<Status>(0);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);

  const isFirstRun = useRef(true);

  const { status } = useStore();

  useEffect(() => {
    const roomsRef = ref(database, "rooms/office");
    const unSubscribe = onValue(roomsRef, (snaps) => {
      const data = snaps.val();
      if (data !== null) {
        console.log(data);
        setCurrent(data.officecurrent || 0);
        setRoomSwtich(data.status || 0);
        setPower(data.power || 0);
      }
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const roomsRef = ref(database, "rooms/office");
    update(roomsRef, {
      status: roomSwtich,
    }).catch((error) => {
      console.error("Failed to update status :", error);
    });
  },[roomSwtich]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <HeaderText text="Office" />
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
