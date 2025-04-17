import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import MainCard from "components/MainCard";
import Buttons from "components/welcome/Buttons";
import UtilsStyles from "constants/utils";
import HeaderText from "components/HeaderText";
import React, { useState, useEffect, useRef } from "react";

//firebase
import { ref, onValue, update } from "firebase/database";
import { database } from "../lib/firebase";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "store/store";
import FaultCard from "components/FaultCard";

export default function WelcomeScreen() {
  const colorSchema = useColorScheme();
  const themeColor = Colors[colorSchema ?? "light"];

  const [voltage, setVoltage] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);

  const { setStatus, togglePower, status, powerStatus } = useStore();

  const isFirstRun = useRef(true);

  useEffect(() => {
    const dashboardRef = ref(database, "dashboard");

    const unsubscribe = onValue(dashboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setVoltage(Math.round(data.currentVoltage) || 0);
        setPowerConsumption(Math.round(data.powerConsumption) || 0);

        setStatus(data.online || 0);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  useEffect(() => {
    const rooms = ref(database, "rooms");
    const unsubscribe = onValue(rooms, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        console.log(data.powerStatus);
        togglePower(data.powerStatus);
      }
    });
    return () => unsubscribe();
  }, []);

  // Write powerStatus to Firebase when mainSwitch changes (skip first load)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const roomsRef = ref(database, "rooms");
    const officeRef = ref(database, "rooms/office");
    const livingRef = ref(database, "rooms/living");
    const kitchenRef = ref(database, "rooms/kitchen");

    update(roomsRef, {
      powerStatus: powerStatus,
    }).catch((error) => {
      console.error("Failed to update powerStatus:", error);
    });

    if (powerStatus == 0) {
      update(officeRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });

      update(livingRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
      update(kitchenRef, {
        status: powerStatus,
      }).catch((error) => {
        console.error("Failed to update powerStatus:", error);
      });
    }
  }, [powerStatus]);

  return (
    <SafeAreaView
      style={[
        UtilsStyles.container,
        { backgroundColor: themeColor.background },
      ]}
    >
      <ScrollView>
        <HeaderText text="Dashboard" />
        <MainCard
          mainSwitch={powerStatus}
          setMainSwitch={togglePower}
          voltage={voltage}
          powerConsumption={powerConsumption}
          wifiMode={status}
        />
        <Buttons />
        <FaultCard faultName="Earth Fault" fault={1} />
        <FaultCard faultName="Over Current" fault={0} />
        <FaultCard faultName="Under Voltage" fault={0}/>
        <FaultCard faultName="Surge" fault={0} />
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};
